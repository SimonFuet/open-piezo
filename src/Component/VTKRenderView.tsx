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



export class VTKRenderView extends React.Component {
    openglRenderWindow: any;
    constructor(props: any) {
        super(props);
        this.openglRenderWindow = null;
    }

    componentDidMount() {
        const renderWindow = vtkRenderWindow.newInstance();
        const renderer = vtkRenderer.newInstance({ background: [0.2, 0.3, 0.4] });
        renderWindow.addRenderer(renderer);

        // ----------------------------------------------------------------------------
        // Simple pipeline ConeSource --> Mapper --> Actor
        // ----------------------------------------------------------------------------

        const polydata = PolyData.newInstance();
        const vertexArray = [];
        vertexArray.push(0, 0, 0);
        vertexArray.push(1, 0, 0);
        vertexArray.push(0, 1, 0);
        vertexArray.push(1, 1, 0);
        vertexArray.push(2, 0, 0);

        const cellArray = [];
        cellArray.push(5);
        cellArray.push(0);
        cellArray.push(1);
        cellArray.push(2);
        cellArray.push(3);
        cellArray.push(4);
        polydata.getPoints().setData(Float32Array.from(vertexArray), 3);
        polydata.getLines().setData(Uint16Array.from(cellArray));

        const points = Points.newInstance();
        points.setNumberOfPoints(5);
        points.setPoint(0, 0, 0, 0);
        points.setPoint(1, 1, 0, 0);
        points.setPoint(2, 0, 1, 0);
        points.setPoint(3, 1, 1, 0);
        points.setPoint(4, 2, 0, 0);

        const pointset = PolyData.newInstance();
        pointset.setPoints(points);

        const coneSource = ConeSource.newInstance({ height: 1.0 });

        const mapper = vtkMapper.newInstance();
        mapper.setInputData(polydata);
        //mapper.setInputData(coneSource.getOutputData());
        //mapper.setInputConnection(coneSource.getOutputPort());

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
        renderWindow.addView(openglRenderWindow);

        // ----------------------------------------------------------------------------
        // Create a div section to put this into
        // ----------------------------------------------------------------------------

        const container = document.getElementById('VTKRenderView');
        if (container === null) {
            console.log("Container is null");
            return;
        }
        openglRenderWindow.setContainer(container);

        renderWindow.render();

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

    render() {
        return (
            <div id="VTKRenderView">

            </div>
        );
    }
}

