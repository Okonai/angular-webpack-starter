import { Action} from '@ngrx/store';
import {News} from '../models/news.model';

// Load main-navigation

export const LOAD_NEWS = '[Navigation] Load News';
export const LOAD_NEWS_FAIL = '[Navigation] Load News Fail';
export const LOAD_NEWS_SUCCESS = '[Navigation] Load News Succed';

export class LoadNews implements Action {
  readonly type = LOAD_NEWS;

  constructor() {}
}

export class LoadNewsFail implements Action {
  readonly type = LOAD_NEWS_FAIL;
  constructor(public payload: any) {}
}

export class LoadNewsSuccess implements Action {
  readonly type = LOAD_NEWS_SUCCESS;
  constructor(public payload: News) {}
}

// action types
export type NewsActions
  = LoadNews
  | LoadNewsFail
  | LoadNewsSuccess;
