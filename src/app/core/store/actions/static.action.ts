import { Action } from '@ngrx/store';
import { StaticPage } from '../models/static.model';

export const staticActionTypes = {
    LOAD_STATIC: '[Static] Load static page',
    LOAD_STATIC_ERROR: '[Static] Load static page error',
    LOAD_STATIC_SUCCESS: '[Static] Load static page success',

    LOAD_WIDGET: '[Static] Load widget',
    LOAD_WIDGET_ERROR: '[Static] Load widget error',
    LOAD_WIDGET_SUCCESS: '[Static] Load widget success',
};

export class LoadStaticAction implements Action {
    public type: string = staticActionTypes.LOAD_STATIC;

    constructor(public payload: {staticId: number}) {}
  }

  export class LoadStaticErrorAction implements Action {
    public type: string = staticActionTypes.LOAD_STATIC_ERROR;

    constructor(public payload?: any) {}
  }

  export class LoadStaticSuccessAction implements Action {
    public type: string = staticActionTypes.LOAD_STATIC_SUCCESS;

    constructor(public payload: {staticPage: StaticPage}) {}
  }

/**
 * Actions type.
 * @type {Actions}
 */
export type StaticActions
=
LoadStaticAction
| LoadStaticErrorAction
| LoadStaticSuccessAction;
