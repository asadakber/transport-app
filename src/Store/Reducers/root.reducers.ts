import { combineReducers } from 'redux';
import { SignupState, SIGNUP_INITIAL_STATE, authReducer } from '../Reducers/auth';

export interface AppState {
    signup: SignupState;
}

export const INITIAL_STATE = {
    signup: SIGNUP_INITIAL_STATE
}

export const RootReducer = combineReducers<AppState>({
    signup: authReducer
})