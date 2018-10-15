import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { Observable } from 'rxjs';
import { AuthForm } from '../../../../core/store/models/auth.model';
import * as fromStore from '../../../../core/store/index';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  isLoading$: Observable<boolean>;
  isSmartShop: boolean;

  constructor (
    private store: Store<fromStore.MainState>,
    private route: ActivatedRoute,
    private router: Router,
    private socialAuthService: AuthService,
    ) { }

  ngOnInit () {
    this.isSmartShop = window['site'] === 'SMARTSHOP';
    this.isLoading$ = this.store.select(fromStore.isLoadingAuth);
    this.store.select(fromStore.authGoTo).subscribe((where) => {
      if (where !== undefined) {
        this.router.navigate(['/auth/' + where]);
      }
    });
  }

  getErrorMessage () {
    return this.email.hasError('required') ? 'Az e-mail megadása kötelező.' :
    this.email.hasError('email') ? 'Ez nem valós e-mail cím.' : '';
  }

  nextStep () {
    if (this.email.valid) {
      this.store.dispatch(new fromStore.SetAuthEmail({ auth_form: { email: this.email.value, loading: true } }));
    }
  }

  keyDownFunction (event) {
    if (event.keyCode === 13) {
      this.email.markAsTouched();
      this.nextStep();
    }
  }
  socialSignIn (socialPlatform: string) {
      let socialPlatformProvider;
      if (socialPlatform === 'facebook') {
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      } else if (socialPlatform === 'google') {
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      }
      // TODO
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          // console.log(socialPlatform+" sign in data : " , userData);
        }
      );
  }
  backToRoot () {
    this.router.navigate(['/']);
  }
}
