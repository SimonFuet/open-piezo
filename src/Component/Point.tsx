import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { VtkPoint } from '../store/vtk/types';

interface Props {
    point: VtkPoint,
    pointId: number,
    edit(pointId: number, point: VtkPoint): void,
    delete(pointId: number): void
}

const Point = ({ point, pointId, ...props }: Props) => (
    <div>
        <Row>
            <Col>
                <p>{pointId}=({point.x},{point.y})({point.value}) </p>
            </Col>
            <Col>
                <Button onClick={() => props.delete(pointId)}>Delete</Button>
            </Col>
        </Row>
    </div>
)

export default Point;