import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from '@store/index';
import { Store } from '@ngrx/store';

import { retry, catchError } from 'rxjs/operators';
import { API_PATH } from '@core/constants';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

export function applicationHttpClientCreator (http: HttpClient) {
  return new ApplicationHttpClient(http);
}

@Injectable()
export class ApplicationHttpClient {
  private _token: string;
  private _header;

  constructor (public http: HttpClient, private _store?: Store<fromStore.MainState>) {
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Get<T> (endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(API_PATH.path + endPoint, this._getOptions(options)).pipe(
      retry(3)
    );
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Post<T> (endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    return this.http.post<T>(API_PATH.path + endPoint, params, this._getOptions(options));
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Put<T> (endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    return this.http.put<T>(API_PATH.path + endPoint, params, this._getOptions(options));
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Delete<T> (endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(API_PATH.path + endPoint, this._getOptions(options));
  }

  private _getOptions (options: IRequestOptions) {

    this._token = window.localStorage
    .getItem('access_token') ? window.localStorage
    .getItem('access_token') : window.sessionStorage
    .getItem('access_token');

    if (this._token) {
      this._header = new HttpHeaders({ 'Authorization': 'Bearer ' + this._token });
    } else {
      this._header = null;
    }

    if (typeof options !== undefined) {
      options = {
        ...options,
        headers: this._header
      };
    } else {
      options.headers = Object.assign({}, options.headers, this._header);
    }

    return options;
  }
}
