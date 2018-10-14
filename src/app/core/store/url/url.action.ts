import { Action } from '@ngrx/store';

export const RESOLVE_URL = '[UrlResolver] Resolve Url';
export const RESOLVE_URL_SUCCESS = '[UrlResolver] Resolve Url Success';
export const RESOLVE_URL_ERROR = '[UrlResolver] Resolve Url Error';

export class ResolveUrlAction implements Action {
  public type: string = RESOLVE_URL;
  constructor (public payload?: { slug: string }) {}
}

export class ResolveUrlErrorAction implements Action {
  public type: string = RESOLVE_URL_ERROR;
  constructor (public payload?: any) {}
}

export class ResolveUrlSuccessAction implements Action {
  public type: string = RESOLVE_URL_SUCCESS;
  constructor (public payload?: { controllerName: string, id: number }) {}
}

export type UrlActions
  =
  | ResolveUrlAction
  | ResolveUrlErrorAction
  | ResolveUrlSuccessAction
  ;
