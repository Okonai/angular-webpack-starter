import * as bannerActions from '../actions/banner.action';
import { Banner } from '../models/banner.model';

export interface BannerState {
  loading: boolean;
  loaded: boolean;
  data?: Banner;
  error?: any;
}

export const initialState: BannerState = {
  loaded: false,
  loading: false,
};

export function reducer (state = initialState, action: bannerActions.BannerActions): BannerState {
  switch (action.type) {
    case bannerActions.BannerActionTypes.LOAD: {
      return {
        ...state,
        loading: true
      };
    }

    case bannerActions.BannerActionTypes.LOAD_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload[0]
      };
    }

     case bannerActions.BannerActionTypes.LOAD_ERROR: {

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

export const getBannerLoading = (state: BannerState) => state.loading;
export const getBannerLoaded = (state: BannerState) => state.loaded;
export const getBanner = (state: BannerState) => state.data;
