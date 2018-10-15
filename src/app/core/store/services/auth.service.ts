import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Store } from '@ngrx/store';

import * as fromStore from '@store/index';
import { API_PATH } from '@core/constants';
import { ApplicationHttpClient } from '@core/services/http.service';


import { LoginResponse, RegisterResponse, UserResponse, IsUserResponse, ForgotResponse, LoadResponse } from '../models/auth.model';

@Injectable()
export class AuthService {


  /**
   * True if authenticated
   * @type
   */

  constructor(private _http: ApplicationHttpClient, private _store: Store<fromStore.MainState>) {  }

  public authLoadUser(): Observable<UserResponse> {
    return this._http
    .Get<UserResponse>(API_PATH.base + `get-user`)
    .map(response => {
      return response;
    });
  }

  public authLogin(payload): Observable<LoginResponse> {
    return this._http
    .Post<LoginResponse>(API_PATH.base + `user-sign-in`, payload['auth_form'])
    .map(response => {
      return response;
    });
  }

  public authLoad(payload): Observable<LoadResponse> {
    return this._http
    .Post<LoadResponse>(API_PATH.base + `get-user`, { params: payload })
    .map(response => {
      return response;
    });
  }

  public authIsUser(payload): Observable<IsUserResponse> {
    return this._http
    .Post<IsUserResponse>(API_PATH.base + `is-user`, { params: payload })
    .map(response => {
      return response;
    });
  }

  public authRegister(payload): Observable<RegisterResponse> {
    return this._http
    .Post<RegisterResponse>(API_PATH.base + `user-register`, { params: payload })
    .map(response => {
      return response;
    });
  }

  public authForgotPassword(payload): Observable<ForgotResponse> {
    return this._http
    .Post<ForgotResponse>(API_PATH.base + `forgot-password`, { params: payload })
    .map(response => {
      return response;
    });
  }

  public authForgotPasswordUpdate(payload): Observable<ForgotResponse> {
    return this._http
    .Post<ForgotResponse>(API_PATH.base + `forgot-password-update`, { params: payload })
    .map(response => {
      return response;
    });
  }
}
