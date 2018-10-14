import * as fromUrlResolver from './url.action';
import { ResolvedUrl } from './url.model';

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

export function reducer (state = initialState, action: fromUrlResolver.UrlActions): UrlState {

  switch (action.type) {

    case fromUrlResolver.RESOLVE_URL: {
      return {
        ...state,
        loading: true
      };
    }

    case fromUrlResolver.RESOLVE_URL_SUCCESS: {
      return {
        ...state,
        loading: false,
        resolvedUrl: action.payload
      };
    }

    case fromUrlResolver.RESOLVE_URL_ERROR: {
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
