import React from 'react';

import { RootState } from '../store';
import { addPoint, deletePoint } from '../store/vtk/action';
import { VtkPoint } from '../store/vtk/types';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import Point from './Point';
import AddPoint from './AddPoint';
import { ListGroup } from 'react-bootstrap';

const mapStateToProps = (state: RootState) => ({
    points: state.vtk.points
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addPoint: (point: VtkPoint) => dispatch(addPoint(point)),
    deletePoint: (pointId: number) => dispatch(deletePoint(pointId))
})

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
)

type PropsFromRedux = ConnectedProps<typeof connector>

const PointList = (props: PropsFromRedux) => {
    const pointsElts = props.points.map((point, index) => (
        <ListGroup.Item>
            <Point
                point={point}
                pointId={index}
                edit={() => { }}
                delete={(pointId) => props.deletePoint(pointId)}
            />
        </ListGroup.Item>
    ))

    return (
        <div>
            <ListGroup>
                {pointsElts}
            </ListGroup>
            <AddPoint addPoint={point => props.addPoint(point)} />
        </div>
    )
}

export default connector(PointList);