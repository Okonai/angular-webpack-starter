import * as fromNavigation from './navigation.action';
import { Navigation } from './navigation.model';

export interface NavigationState {
  data: Navigation[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: NavigationState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer (
  state = initialState,
  action: fromNavigation.NavigationActions
): NavigationState {

  switch (action.type) {
    case fromNavigation.LOAD_NAVIGATION: {

      return {
        ...state,
        loading: true
      };
    }

    case fromNavigation.LOAD_NAVIGATION_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data
      };
    }

    case fromNavigation.LOAD_NAVIGATION_FAIL: {
      const err = action.payload;
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
