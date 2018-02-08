import { Injectable } from '@angular/core';
import {
    DEMO, DEMO_SUCCESS, SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILED,
    LOGIN_SUCCESS, LOGIN, LOGIN_FAILED, SIGNOUT, SIGNOUT_SUCCESS
} from '../Actions/auth'
import { ActionsObservable } from 'redux-observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

@Injectable()

export class AuthEpic {
    authState;
    UserData: string;
    constructor(private afauth: AngularFireAuth) {
        this.afauth.authState.subscribe((auth) => {
            this.authState = auth;
        })
    }

    get authenticated(): any {
        return this.authState !== null;
    }

    get currentUserId(): any {
        return this.authenticated ? this.authState.uid: ''
    }

    signup = (actions$: ActionsObservable<any>) => {
        return actions$.ofType('SIGNUP')
        .switchMap(({payload}) => {
            return this.afauth.auth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then((responce) => {
                payload.uid = responce.uid;
                return {type: SIGNUP_SUCCESS, payload: payload}
            })
            .catch((error) => {
                return {type: SIGNUP_FAILED, payload: error.message}
            })
        })
    }
    Login = (actions$: ActionsObservable<any>) => {
        return actions$.ofType(LOGIN)
            .switchMap(({ payload }) => {
                let email = payload.email;
                let password = payload.password;

                return Observable.fromPromise(
                    this.afauth.auth.signInWithEmailAndPassword(email, password)

                        .then((responce) => {
                             return { type: LOGIN_SUCCESS, payload: responce }
                        })

                        .catch((error) => {
                            return {
                                type: LOGIN_FAILED,
                                payload: error.message
                            }
                        })
                )
            })
    }

    signout = (actions$: ActionsObservable<any>) => {
        return actions$.ofType(SIGNOUT)
        .switchMap(() => {
            this.afauth.auth.signOut();
            return Observable.of({
                type: SIGNOUT_SUCCESS
            })
        })
    }
}