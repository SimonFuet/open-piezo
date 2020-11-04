export interface VtkPoint {
    x: number,
    y: number,
    value: number
}

export interface VtkState {
    points: VtkPoint[]
}

export const ADD_POINT = 'ADD_POINT';
export const DELETE_POINT = 'DELETE_POINT';

interface AddPointAction {
    type: typeof ADD_POINT,
    point: VtkPoint
}

interface DeletePointAction {
    type: typeof DELETE_POINT,
    pointId: number
}

export type VtkActionTypes = AddPointAction | DeletePointAction;