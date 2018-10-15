import { Injectable} from '@angular/core';

import { Effect, Actions} from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';

import * as authActions from '@actions/auth.action';
import * as fromServices from '../services';
import { LoginResponse, RegisterResponse, ForgotResponse } from '@models/auth.model';

import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs';

@Injectable()
export class AuthEffects {

  @Effect()
  authLogin$ = this.actions$
    .ofType<authActions.AuthLogin>(authActions.authActionTypes.AUTH_LOGIN)
    .map((action: authActions.AuthActions) => action.payload)
    .switchMap(payload => {
        return this.authService
          .authLogin(payload).pipe(
            map((login) => new authActions.AuthLoginSuccess({login_response: login['user']})),
            catchError(err => of(new authActions.AuthLoginError({login_response: err})))
          );
      }
    );

  @Effect()
  authIsUser$ = this.actions$
    .ofType<authActions.SetAuthEmail>(authActions.authActionTypes.AUTH_SET_EMAIL)
    .map((action: authActions.AuthActions) => action.payload)
    .switchMap(payload => {
        return this.authService
          .authIsUser(payload).pipe(
            map((login: LoginResponse) => new authActions.AuthIsUserSuccess({is_user_response: login})),
            catchError(err => of(new authActions.AuthIsUserError({is_user_response: err})))
          );
      }
    );

  @Effect()
  authUser$ = this.actions$
    .ofType<authActions.AuthLoadUser>(authActions.authActionTypes.AUTH_LOAD_USER)
    .map((action: authActions.AuthActions) => action.payload)
    .switchMap(payload => {
        return this.authService
          .authLoad(payload).pipe(
            map((load) => new authActions.AuthLoadUserSuccess({load_response: load['user']})),
            catchError(err => of(new authActions.AuthLoadUserError({load_response: err})))
          );
      }
    );

  @Effect()
  authRegister$ = this.actions$
    .ofType<authActions.AuthRegister>(authActions.authActionTypes.AUTH_REGISTER)
    .map((action: authActions.AuthActions) => action.payload)
    .switchMap(payload => {
        return this.authService
          .authRegister(payload).pipe(
            map((register: RegisterResponse) => new authActions.AuthRegisterSuccess({register_response: register})),
            catchError((err) => of(new authActions.AuthRegisterError({register_response: err})))
          );
      }
    );

  @Effect()
  authFogotPassword$ = this.actions$
    .ofType<authActions.AuthForgotPassword>(authActions.authActionTypes.AUTH_FORGOT_PASSWORD)
    .map((action: authActions.AuthActions) => action.payload)
    .switchMap(payload => {
        return this.authService
          .authForgotPassword(payload).pipe(
            map((forgot: ForgotResponse) => new authActions.AuthForgotPasswordSuccess({forgot_response: forgot})),
            catchError((err) => of(new authActions.AuthForgotPasswordError({forgot_response: err})))
          );
      }
    );

  @Effect()
  authFogotCodeUpdate$ = this.actions$
    .ofType<authActions.AuthForgotPasswordUpdate>(authActions.authActionTypes.AUTH_FORGOT_PASSWORD_UPDATE)
    .map((action: authActions.AuthActions) => action.payload)
    .switchMap(payload => {
        return this.authService
          .authForgotPasswordUpdate(payload).pipe(
            map((forgot: ForgotResponse) => new authActions.AuthForgotPasswordUpdateSuccess({forgot_response: forgot})),
            catchError((err) => of(new authActions.AuthForgotPasswordUpdateError({forgot_response: err})))
          );
      }
    );

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$
    .ofType<authActions.AuthLoginSuccess>(authActions.authActionTypes.AUTH_LOAD_USER_SUCCESS)
    .switchMap( () => {
        return Observable.of(
          this.permissionService.addPermission('LOGGED_IN')
        );
      }
    );

  @Effect({dispatch: false})
  logoutSuccess$ = this.actions$
    .ofType<authActions.AuthLoginSuccess>(authActions.authActionTypes.AUTH_LOGOUT)
    .switchMap( () => {
        return Observable.of(
          this.permissionService.removePermission('LOGGED_IN')
        );
      }
    );
  constructor (
    private actions$: Actions,
    private authService: fromServices.AuthService,
    private permissionService: NgxPermissionsService
  ) {}
}
