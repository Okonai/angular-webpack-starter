import * as layout from '../actions/layout.action';
import { ResolvedUrl } from '../models/urlresolver.model';

export interface UrlState {
  resolvedUrl: ResolvedUrl;
  loading: boolean;
  loaded: boolean;
}

const initialState: UrlState = {
  resolvedUrl: {
    controllerName: undefined,
    id: undefined,
    breadCrumb: undefined
  },
  loading: false,
  loaded: false,
};

export function reducer(state = initialState, action: layout.LayoutActions): UrlState {

  switch (action.type) {

    case layout.RESOLVE_URL: {
      return {
        ...state,
        loading: true
      };
    }

    case layout.RESOLVE_URL_SUCCESS: {
      return {
        ...state,
        loading: false,
        resolvedUrl: action.payload
      };
    }

    case layout.RESOLVE_URL_ERROR: {
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

export const getResolvedUrl = (state: UrlState) => state.resolvedUrl;
export const getResolvedControllerName = (state: UrlState) => state.resolvedUrl.controllerName;
export const getResolvedBreadCrumb = (state: UrlState) => state.resolvedUrl.breadCrumb;
