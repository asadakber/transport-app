import {DEMO, DEMO_SUCCESS, SIGNUP_SUCCESS, SIGNUP_FAILED,
    LOGIN_SUCCESS, LOGIN_FAILED, SIGNOUT_SUCCESS, LOGIN, SIGNUP
} from '../Actions/auth';
import { tassign } from 'tassign';

export interface LoginState {
    uid: string;
}

export const LOGIN_INITIAL_STATE = {
    uid: null,
}

export interface SignupState {
    isLoggedIn: boolean;
    error: string;
    isLoading: boolean;
    currentUserEmail: string;
    currentUserUid: string;
    currentUserName: string;
}

export const SIGNUP_INITIAL_STATE = {
    error: null,
    isLoggedIn: true,
    isLoading: false,
    currentUserEmail: null,
    currentUserUid: null,
    currentUserName: null
}

export const signupSuccess = (action, state) => {
    let uid = action.payload.uid;
    let userName = action.payload.name;
    let userEmail = action.payload.email;
    return tassign(state, {
        currentUserEmail: userEmail,
        currentUserUid: uid,
        currentUserName: userName,
        isLoading: false,
        isLoggedIn: true,
        error: null
    })
}

export const signupFailed = (action, state) => {
    return tassign(state, {isLoading: false, isLoggedIn: true, error: action.payload})

}

export const loginSuccess = (state, action) => {
    let currentUserEmail = action.payload.email;
    let currentUserUid = action.payload.uid;
    return tassign(state, {
        currentUserEmail: currentUserEmail,
        currentUserUid: currentUserUid,
        isLoading: false
    })
}

export const loginFailed = (state, action) => {
    return tassign(state, {isLoading: true, isLoggedIn: false, error: action.payload})
}

export const authReducer = (state: SignupState = SIGNUP_INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGNUP_SUCCESS: 
            return signupSuccess(action, state)
        case SIGNUP_FAILED:
            return signupFailed(action, state);
        case LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case LOGIN:
            return tassign(state, {isLoading: true, isLoggedIn: false})
        case LOGIN_FAILED:
            return loginFailed(state, action)
        case SIGNUP:
            return tassign(state, {isLoggedIn: false, isLoading: true})
        case SIGNOUT_SUCCESS: 
            return tassign(state, {isLoggedIn: true}) 
        default:
            return state;   
    }
}