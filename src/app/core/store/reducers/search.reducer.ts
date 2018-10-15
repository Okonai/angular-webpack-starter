import { SearchActions, searchActionTypes } from '@actions/search.action';
import { SearchResult } from '@models/search.model';

// import models

/**
 * The state.
 * @interface State
 */
export interface SearchState {
  loaded: boolean;
  loading: boolean;
  data?: SearchResult;
  query: string;
}

/**
 * The initial state.
 */
const initialState: SearchState = {
  loaded: false,
  loading: false,
  query: '',
  data: {
    products: [],
    categories: [],
  },
};

/**
 * The reducer function.
 * @function reducer
 * @param {State} state Current state
 * @param {Actions} action Incoming action
 */
export function reducer(state: any = initialState, action: SearchActions): SearchState {

  switch (action.type) {
    case searchActionTypes.SEARCH:
      return Object.assign({}, state, {
        loading: true
      });

    case searchActionTypes.SEARCH_COMPLETE: {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data
      };
    }

    case searchActionTypes.SEARCH_ERROR: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    default:
      return state;
  }
}


export const getSearchLoading = (state: SearchState) => state.loading;
export const getSearchLoaded = (state: SearchState) => state.loaded;
export const getSearchResult = (state: SearchState) => state.data;
export const getSearchQuery = (state: SearchState) => state.query;
