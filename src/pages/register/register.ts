import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../Store/Reducers/root.reducers';
import { SIGNUP } from '../../Store/Actions/auth';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  signupForm: FormGroup;
  signupData: Object;
  @select((s: AppState) => s.signup.error) isError$: Observable<string>
  @select((s: AppState) => s.signup.isLoading) isLoading$: Observable<string>
  @select((s: AppState) => s.signup.isLoggedIn) isLoggedIn$: Observable<string>
  constructor(public ngRedux: NgRedux<AppState>,public fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  Register() {
    this.signupData = this.signupForm.value
    this.ngRedux.dispatch({
      type: SIGNUP,
      payload: this.signupData
    })
    this.navCtrl.push(LoginPage)
    this.signupForm.reset()
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

}
