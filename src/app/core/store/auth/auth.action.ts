import { Action } from '@ngrx/store';
import { RootAuth } from './auth.model';

export const authActionTypes = {
  AUTH_NEXT_STEP: '[Auth] Next Step',
  AUTH_PREV_STEP: '[Auth] Prev Step',
  AUTH_SET_EMAIL: '[Auth] Save Email To Store',
  AUTH_LOGIN: '[Auth] Login',
  AUTH_LOGIN_SUCCESS: '[Auth] Login Success',
  AUTH_LOGIN_ERROR: '[Auth] Login Error',
  AUTH_REGISTER: '[Auth] Register',
  AUTH_REGISTER_SUCCESS: '[Auth] Register Success',
  AUTH_REGISTER_ERROR: '[Auth] Register Error',
  AUTH_SET_ACCESS_TOKEN: '[Auth] Set Access Token From Cookie',
  AUTH_LOAD_USER: '[Auth] Load User',
  AUTH_LOAD_USER_SUCCESS: '[Auth] Load User Success',
  AUTH_LOAD_USER_ERROR: '[Auth] Load User Error',
  AUTH_IS_USER: '[Auth] Is User',
  AUTH_IS_USER_SUCCESS: '[Auth] Is User Success',
  AUTH_IS_USER_ERROR: '[Auth] Is User Error',
  AUTH_BACK_TO_AUTH: '[Auth] Back to auth',
  AUTH_FORGOT_PASSWORD: '[Auth] Forgot Password',
  AUTH_FORGOT_PASSWORD_SUCCESS: '[Auth] Forgot Password Success',
  AUTH_FORGOT_PASSWORD_ERROR: '[Auth] Forgot Password Error',
  AUTH_FORGOT_PASSWORD_UPDATE: '[Auth] Forgot Code Update',
  AUTH_FORGOT_PASSWORD_UPDATE_SUCCESS: '[Auth] Forgot Code Update Success',
  AUTH_FORGOT_PASSWORD_UPDATE_ERROR: '[Auth] Forgot Code Update Error',
  AUTH_FORGOT_PASSWORD_UPDATE_RESET: '[Auth] Forgot Code Update Reset',
  AUTH_FORGOT_PASSWORD_ADD_CODE: '[Auth] Forgot Code Add',
  AUTH_LOGOUT: '[Auth] Logout',
  AUTH_RESET: '[Auth] Reset',
};

export class SetAccessToken implements Action {
  readonly type = authActionTypes.AUTH_SET_ACCESS_TOKEN;

  constructor (public payload: RootAuth ) {}
}

export class AuthLoadUser implements Action {
  readonly type = authActionTypes.AUTH_LOAD_USER;

  constructor (public payload?: RootAuth ) {}
}

export class AuthLoadUserSuccess implements Action {
  readonly type = authActionTypes.AUTH_LOAD_USER_SUCCESS;

  constructor (public payload?: RootAuth ) {}
}

export class AuthLoadUserError implements Action {
  readonly type = authActionTypes.AUTH_LOAD_USER_ERROR;

  constructor (public payload?: RootAuth ) {}
}

export class AuthNextStep implements Action {
  readonly type = authActionTypes.AUTH_NEXT_STEP;

  constructor (public payload: RootAuth) {}
}

export class AuthPrevStep implements Action {
  readonly type = authActionTypes.AUTH_PREV_STEP;

  constructor (public payload: RootAuth) {}
}

export class SetAuthEmail implements Action {
  readonly type = authActionTypes.AUTH_SET_EMAIL;

  constructor (public payload: RootAuth) {}
}

export class AuthLogin implements Action {
  readonly type = authActionTypes.AUTH_LOGIN;

  constructor (public payload: RootAuth) {}
}
export class AuthLogout implements Action {
  readonly type = authActionTypes.AUTH_LOGOUT;

  constructor (public payload: RootAuth) {}
}

export class AuthReset implements Action {
  readonly type = authActionTypes.AUTH_RESET;

  constructor (public payload: RootAuth) {}
}

export class AuthLoginSuccess implements Action {
  readonly type = authActionTypes.AUTH_LOGIN_SUCCESS;

  constructor (public payload: RootAuth) {}
}

export class AuthLoginError implements Action {
  readonly type = authActionTypes.AUTH_LOGIN_ERROR;

  constructor (public payload: RootAuth) {}
}

export class AuthRegister implements Action {
  readonly type = authActionTypes.AUTH_REGISTER;

  constructor (public payload: RootAuth) {}
}

export class AuthRegisterSuccess implements Action {
  readonly type = authActionTypes.AUTH_REGISTER_SUCCESS;

  constructor (public payload: RootAuth) {}
}

export class AuthRegisterError implements Action {
  readonly type = authActionTypes.AUTH_REGISTER_ERROR;

  constructor (public payload: RootAuth) {}
}
export class AuthIsUser implements Action {
  readonly type = authActionTypes.AUTH_IS_USER;

  constructor (public payload: RootAuth) {}
}

export class AuthIsUserSuccess implements Action {
  readonly type = authActionTypes.AUTH_IS_USER_SUCCESS;

  constructor (public payload: RootAuth) {}
}

export class AuthIsUserError implements Action {
  readonly type = authActionTypes.AUTH_IS_USER_ERROR;

  constructor (public payload: RootAuth) {}
}
export class AuthBackToAuth implements Action {
  readonly type = authActionTypes.AUTH_BACK_TO_AUTH;

  constructor (public payload?: RootAuth) {}
}

export class AuthForgotPassword implements Action {
  readonly type = authActionTypes.AUTH_FORGOT_PASSWORD;

  constructor (public payload?: RootAuth) {}
}

export class AuthForgotPasswordSuccess implements Action {
  readonly type = authActionTypes.AUTH_FORGOT_PASSWORD_SUCCESS;

  constructor (public payload?: RootAuth) {}
}

export class AuthForgotPasswordError implements Action {
  readonly type = authActionTypes.AUTH_FORGOT_PASSWORD_ERROR;

  constructor (public payload?: RootAuth) {}
}

export class AuthForgotPasswordUpdate implements Action {
  readonly type = authActionTypes.AUTH_FORGOT_PASSWORD_UPDATE;

  constructor (public payload?: RootAuth) {}
}

export class AuthForgotPasswordUpdateSuccess implements Action {
  readonly type = authActionTypes.AUTH_FORGOT_PASSWORD_UPDATE_SUCCESS;

  constructor (public payload?: RootAuth) {}
}

export class AuthForgotPasswordUpdateError implements Action {
  readonly type = authActionTypes.AUTH_FORGOT_PASSWORD_UPDATE_ERROR;

  constructor (public payload?: RootAuth) {}
}
export class AuthResetForgotCodeError implements Action {
  readonly type = authActionTypes.AUTH_FORGOT_PASSWORD_UPDATE_RESET;

  constructor (public payload?: RootAuth) {}
}
export class AuthForgotAddCode implements Action {
  readonly type = authActionTypes.AUTH_FORGOT_PASSWORD_ADD_CODE;

  constructor (public payload?: RootAuth) {}
}

export type AuthActions
  = SetAccessToken
  | AuthNextStep
  | SetAuthEmail
  | AuthLogin
  | AuthLoginSuccess
  | AuthLoginError
  | AuthRegister
  | AuthRegisterSuccess
  | AuthRegisterError
  | AuthLoadUser
  | AuthLoadUserSuccess
  | AuthLoadUserError
  | AuthIsUser
  | AuthIsUserSuccess
  | AuthIsUserError
  | AuthBackToAuth
  | AuthForgotPassword
  | AuthForgotPasswordSuccess
  | AuthForgotPasswordError
  | AuthForgotPasswordUpdate
  | AuthForgotPasswordUpdateSuccess
  | AuthForgotPasswordUpdateError
  | AuthResetForgotCodeError
  | AuthLogout
  ;
