import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//AngularFire2
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

//Redux
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { combineReducers } from 'redux';
import { AuthEpic } from '../Store/Epics/epics';
import { createEpicMiddleware } from 'redux-observable';
import { RootReducer, AppState, INITIAL_STATE } from '../Store/Reducers/root.reducers';
//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

export const CONFIG = {
  apiKey: "AIzaSyCLRsDsZ1a5_mlVI0thYzwO4pDIx2ZFlRA",
  authDomain: "transport-tracker-app.firebaseapp.com",
  databaseURL: "https://transport-tracker-app.firebaseio.com",
  projectId: "transport-tracker-app",
  storageBucket: "transport-tracker-app.appspot.com",
  messagingSenderId: "900102067640"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(CONFIG),
    AngularFirestoreModule.enablePersistence(),
    NgReduxModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthEpic,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>, private authEpic: AuthEpic) {
    const middleware = [
      createEpicMiddleware(this.authEpic.signup),
      createEpicMiddleware(this.authEpic.Login),
      createEpicMiddleware(this.authEpic.signout)
    ]
    ngRedux.configureStore(RootReducer, INITIAL_STATE, middleware)
  }
}
