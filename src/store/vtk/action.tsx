import { VtkPoint, VtkActionTypes, ADD_POINT, DELETE_POINT } from './types';

export function addPoint(point: VtkPoint): VtkActionTypes {
    return {
        type: ADD_POINT,
        point: point
    };
}

export function deletePoint(pointId: number): VtkActionTypes {
    return {
        type: DELETE_POINT,
        pointId: pointId
    };
}