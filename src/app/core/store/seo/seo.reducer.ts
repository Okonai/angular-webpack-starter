import * as seoActions from './seo.action';
import { Seo } from './seo.model';

export interface SeoState {
  loading: boolean;
  data: Seo;
  error?: any;
}

export const initialState: SeoState  = {
  loading: false,
  data: null,
};

export function reducer (state = initialState, action: seoActions.SeoActions): SeoState {
  switch (action.type) {
    case seoActions.seoActionTypes.LOAD: {
      return {
        ...state,
        loading: true,
      };
    }

    case seoActions.seoActionTypes.LOAD_SUCCESS: {
      const data = action.payload.tags;
      return {
        ...state,
        loading: false,
        data
      };
    }

     case seoActions.seoActionTypes.LOAD_ERROR: {

      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
