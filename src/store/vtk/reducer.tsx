import { VtkState, ADD_POINT, DELETE_POINT, VtkActionTypes } from './types';

const initialState: VtkState = {
    points: []
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