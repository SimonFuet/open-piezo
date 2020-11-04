import { combineReducers } from 'redux';
import { vtkDataReducer } from './vtk/reducer';

export const rootReducer = combineReducers({
    vtk: vtkDataReducer
})

export type RootState = ReturnType<typeof rootReducer>;