import { Action} from '@ngrx/store';
import {Navigation} from '../models/navigation.model';

// Load main-navigation

export const LOAD_NAVIGATION = '[Navigation] Load Navigation';
export const LOAD_NAVIGATION_FAIL = '[Navigation] Load Navigation Fail';
export const LOAD_NAVIGATION_SUCCESS = '[Navigation] Load Navigation Succed';

export class LoadNavigation implements Action {
  readonly type = LOAD_NAVIGATION;

  constructor() {}
}

export class LoadNavigationFail implements Action {
  readonly type = LOAD_NAVIGATION_FAIL;
  constructor(public payload: any) {}
}

export class LoadNavigationSuccess implements Action {
  readonly type = LOAD_NAVIGATION_SUCCESS;
  constructor(public payload: Navigation[]) {}
}

// action types
export type NavigationActions
  = LoadNavigation
  | LoadNavigationFail
  | LoadNavigationSuccess;
