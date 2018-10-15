import * as fromNavigation from '../actions/navigation.action';
import { Navigation } from '../models/navigation.model';

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

export const getNavigationLoading = (state: NavigationState) => state.loading;
export const getNavigationLoaded = (state: NavigationState) => state.loaded;
export const getNavigation = (state: NavigationState) => state.data;
