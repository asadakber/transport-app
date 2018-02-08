import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';
import { NgRedux, select } from 'ng2-redux';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../Store/Reducers/root.reducers';
import { LOGIN } from '../../Store/Actions/auth';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  LoginForm: FormGroup;
  loginData: Object;
  error: string;
  @select((s: AppState) => s.signup.isLoading) loader
  @select((s: AppState) => s.signup.error) isError;
  @select((s: AppState) => s.signup.isLoggedIn) isloggedIn$: Observable<boolean>
  constructor(public ngRedux: NgRedux<AppState>,public fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
      this.LoginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.loginData = this.LoginForm.value;
    this.ngRedux.dispatch({
      type: LOGIN,
      payload: this.loginData
    })
    this.navCtrl.push(HomePage)
    this.LoginForm.reset()
  }

  register() {
    this.navCtrl.push(RegisterPage)
  }

}
