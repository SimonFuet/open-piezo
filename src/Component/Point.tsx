import React from 'react';
import { VtkPoint } from '../store/vtk/types';

interface Props {
    point: VtkPoint,
    pointId: number,
    edit(pointId: number, point: VtkPoint): void,
    delete(pointId: number): void
}

const Point = ({ point, pointId, ...props }: Props) => (
    <div>
        <p>{pointId}=({point.x},{point.y})({point.value}) </p>
        <button>Edit</button>
        <button onClick={() => props.delete(pointId)}>Delete</button>
    </div>
)

export default Point;