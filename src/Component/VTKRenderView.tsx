import React from 'react';

import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkActor2D from 'vtk.js/Sources/Rendering/Core/Actor2D';
import PolyData from 'vtk.js/Sources/Common/DataModel/PolyData';
import PointSet from 'vtk.js/Sources/Common/DataModel/PointSet';
import Points from 'vtk.js/Sources/Common/Core/Points';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkOpenGLRenderWindow from 'vtk.js/Sources/Rendering/OpenGL/RenderWindow';
import vtkRenderWindow from 'vtk.js/Sources/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from 'vtk.js/Sources/Rendering/Core/RenderWindowInteractor';
import vtkRenderer from 'vtk.js/Sources/Rendering/Core/Renderer';
import vtkInteractorStyleTrackballCamera from 'vtk.js/Sources/Interaction/Style/InteractorStyleTrackballCamera';
import ConeSource from 'vtk.js/Sources/Filters/Sources/ConeSource';
import { RootState } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import { VtkState } from '../store/vtk/types';

const mapStateToProps = (state: RootState) => ({
    vtk: state.vtk
})

const mapDispatchToProps = {

}

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
)

type PropsFromRedux = ConnectedProps<typeof connector>

interface State {
    vtk: VtkState
}

class VTKRenderView extends React.Component<PropsFromRedux, {}> {
    openglRenderWindow: any;
    polydata: any;
    renderWindow: any;
    state: State;
    constructor(props: PropsFromRedux) {
        super(props);
        this.openglRenderWindow = null;
        this.polydata = null;
        this.renderWindow = null;

        this.state = {
            vtk: { points: [] }
        }
    }

    componentDidMount() {
        this.renderWindow = vtkRenderWindow.newInstance();
        const renderer = vtkRenderer.newInstance({ background: [0.2, 0.3, 0.4] });
        this.renderWindow.addRenderer(renderer);

        // ----------------------------------------------------------------------------
        // Simple pipeline ConeSource --> Mapper --> Actor
        // ----------------------------------------------------------------------------

        const dataPoints = this.props.vtk.points;

        this.polydata = PolyData.newInstance();
        const vertexArray = [];
        const cellArray = [];
        cellArray.push(dataPoints.length);

        for (let i = 0; i < dataPoints.length; i++) {
            const curPoint = dataPoints[i];
            vertexArray.push(curPoint.x, curPoint.y, 0);
            cellArray.push(i);
        }

        this.polydata.getPoints().setData(Float32Array.from(vertexArray), 3);
        this.polydata.getLines().setData(Uint16Array.from(cellArray));

        const mapper = vtkMapper.newInstance();
        mapper.setInputData(this.polydata);

        const actor = vtkActor.newInstance();
        //const actor = vtkActor2D.newInstance();
        actor.setMapper(mapper);
        actor.getProperty().setRepresentationToPoints();
        actor.getProperty().setPointSize(5);

        // ----------------------------------------------------------------------------
        // Add the actor to the renderer and set the camera based on it
        // ----------------------------------------------------------------------------

        renderer.addActor(actor);
        renderer.resetCamera();

        // ----------------------------------------------------------------------------
        // Use OpenGL as the backend to view the all this
        // ----------------------------------------------------------------------------

        const openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
        this.openglRenderWindow = openglRenderWindow;
        this.renderWindow.addView(openglRenderWindow);

        // ----------------------------------------------------------------------------
        // Create a div section to put this into
        // ----------------------------------------------------------------------------

        const container = document.getElementById('VTKRenderView');
        if (container === null) {
            console.log("Container is null");
            return;
        }
        openglRenderWindow.setContainer(container);

        this.renderWindow.render();

        // ----------------------------------------------------------------------------
        // Capture size of the container and set it to the renderWindow
        // ----------------------------------------------------------------------------

        openglRenderWindow.setSize(container.clientWidth, window.innerHeight);

        window.onresize = () => {
            if (this.openglRenderWindow !== null) {
                const container = document.getElementById('VTKRenderView');
                if (container === null) {
                    console.log("Container is null");
                    return;
                }
                this.openglRenderWindow.setSize(container.clientWidth, window.innerHeight);
            }
        }

        // ----------------------------------------------------------------------------
        // Setup an interactor to handle mouse events
        // ----------------------------------------------------------------------------

        const interactor = vtkRenderWindowInteractor.newInstance();
        interactor.setView(openglRenderWindow);
        interactor.initialize();
        interactor.bindEvents(container);

        // ----------------------------------------------------------------------------
        // Setup interactor style to use
        // ----------------------------------------------------------------------------

        interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());

    }

    shouldComponentUpdate(nextProp: PropsFromRedux, nextState: {}) {
        console.log("Should component update");
        console.log(nextProp);
        console.log(this.props.vtk);
        if (JSON.stringify(nextProp.vtk) !== JSON.stringify(this.props.vtk)) {
            console.log("Updating");
            const dataPoints = nextProp.vtk.points;
            const vertexArray = [];
            const cellArray = [];
            cellArray.push(dataPoints.length);

            for (let i = 0; i < dataPoints.length; i++) {
                const curPoint = dataPoints[i];
                vertexArray.push(curPoint.x, curPoint.y, 0);
                cellArray.push(i);
            }

            this.polydata.getPoints().setData(Float32Array.from(vertexArray), 3);
            this.polydata.getLines().setData(Uint16Array.from(cellArray));
            this.polydata.modified();
            this.renderWindow.render();
        }
        return true;
    }

    render() {
        return (
            <div id="VTKRenderView">

            </div>
        );
    }
}

export default connector(VTKRenderView);
