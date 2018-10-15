import * as fromStatic from '../actions/static.action';
import { StaticPage } from '../models/static.model';


export interface StaticPageState {
  staticPage: StaticPage;
  loaded: boolean;
  loading: boolean;
}

export const initialState: StaticPageState = {
  staticPage: null,
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromStatic.StaticActions
): StaticPageState {

  switch (action.type) {
    case fromStatic.staticActionTypes.LOAD_STATIC: {
      return {
        ...state,
        loading: true
      };
    }

    case fromStatic.staticActionTypes.LOAD_STATIC_SUCCESS: {
      const staticPage = action.payload.staticPage;
      return {
        ...state,
        loading: false,
        loaded: true,
        staticPage
      };
    }

    case fromStatic.staticActionTypes.LOAD_STATIC_ERROR: {
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

export const getStaticPageLoading = (state: StaticPageState) => state.loading;
export const getStaticPageLoaded = (state: StaticPageState) => state.loaded;
export const getStaticPage = (state: StaticPageState) => state.staticPage;
