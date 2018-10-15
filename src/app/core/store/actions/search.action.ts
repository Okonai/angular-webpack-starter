import { Action } from '@ngrx/store';
import { SearchResult } from '../models/search.model';

export const searchActionTypes = {
  SEARCH: '[Search] Search',
  SEARCH_COMPLETE: '[Search] Search Complete',
  SEARCH_ERROR: '[Search] Search Error',
};

export class Search implements Action {
  readonly type = searchActionTypes.SEARCH;

  constructor(public payload: string) { }
}

export class SearchComplete implements Action {
  readonly type = searchActionTypes.SEARCH_COMPLETE;

  constructor(public payload: SearchResult) { }
}

export class SearchError implements Action {
  readonly type = searchActionTypes.SEARCH_ERROR;

  constructor(public payload: string) { }
}

/**
 * Actions type.
 * @type {Actions}
 */
export type SearchActions
  =
  Search
  | SearchComplete
  | SearchError
  ;
