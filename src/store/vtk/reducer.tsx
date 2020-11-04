import { VtkState, ADD_POINT, DELETE_POINT, VtkActionTypes } from './types';

const initialState: VtkState = {
    points: [
        { x: 0, y: 0, value: 10 },
        { x: 1, y: 1, value: 10 },
        { x: 2, y: 2, value: 10 }
    ]
}

export function vtkDataReducer(state = initialState, action: VtkActionTypes): VtkState {
    switch (action.type) {
        case ADD_POINT:
            return {
                ...state,
                points: [
                    ...state.points,
                    action.point
                ]
            };
        case DELETE_POINT:
            return {
                ...state,
                points: state.points.filter((point, index) => index !== action.pointId)
            };
        default: return state;
    }
}