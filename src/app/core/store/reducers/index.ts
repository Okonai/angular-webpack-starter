
import {
    StoreModule,
    ActionReducerMap,
    MetaReducer,
    createFeatureSelector,
    createSelector
} from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { compose } from '@ngrx/store';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';

import * as fromRouter from '@ngrx/router-store';

import * as fromLayout from './layout.reducer';
import * as fromUrl from './url.reducer';
import * as fromNavigation from './navigation.reducer';
import * as fromNews from './news.reducer';
import * as fromSlider from './slider.reducer';
import * as fromTiles from './tiles.reducer';
import * as fromPromotion from './promotion.reducer';
import * as fromUsers from './user.reducer';
import * as fromSearch from './search.reducer';
import * as fromProduct from './product.reducer';
import * as fromModal from './modal.reducer';
import * as fromFilter from './filter.reducer';
import * as fromAuth from './auth.reducer';
import * as fromStatic from './static.reducer';
import * as fromSeo from './seo.reducer';
import * as fromBanner from './banner.reducer';
import * as fromCart from './cart.reducer';

export interface MainState {
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    layout: fromLayout.LayoutState;
    url: fromUrl.UrlState;
    navigation: fromNavigation.NavigationState;
    news: fromNews.NewsState;
    slider: fromSlider.SliderState;
    tiles: fromTiles.TilesState;
    promotion: fromPromotion.PromotionState;
    user: fromUsers.UserState;
    search: fromSearch.SearchState;
    product: fromProduct.ProductState;
    modal: fromModal.ModalState;
    filter: fromFilter.FilterState;
    auth: fromAuth.AuthState;
    static: fromStatic.StaticPageState;
    seo: fromSeo.SeoState;
    banner: fromBanner.BannerState;
    cart: fromCart.CartState;
}

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

const modules = {
  router: routerReducer,
  layout: fromLayout.reducer,
  url: fromUrl.reducer,
  navigation: fromNavigation.reducer,
  news: fromNews.reducer,
  slider: fromSlider.reducer,
  tiles: fromTiles.reducer,
  promotion: fromPromotion.reducer,
  user: fromUsers.reducer,
  search: fromSearch.reducer,
  product: fromProduct.reducer,
  modal: fromModal.reducer,
  filter: fromFilter.reducer,
  auth: fromAuth.reducer,
  static: fromStatic.reducer,
  seo: fromSeo.reducer,
  banner: fromBanner.reducer,
  cart: fromCart.reducer
};

export const syncReducers = {
  router: routerReducer,
  layout: fromLayout.reducer,
  url: fromUrl.reducer,
  navigation: fromNavigation.reducer,
  news: fromNews.reducer,
  slider: fromSlider.reducer,
  tiles: fromTiles.reducer,
  promotion: fromPromotion.reducer,
  user: fromUsers.reducer,
  search: fromSearch.reducer,
  product: fromProduct.reducer,
  modal: fromModal.reducer,
  filter: fromFilter.reducer,
  auth: fromAuth.reducer,
  static: fromStatic.reducer,
  seo: fromSeo.reducer,
  banner: fromBanner.reducer,
  cart: fromCart.reducer
};

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize (routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

const deepCombineReducers = (allReducers: any) => {
  Object.getOwnPropertyNames(allReducers).forEach((prop) => {
    if (allReducers.hasOwnProperty(prop)
      && allReducers[prop] !== null
      && typeof allReducers[prop] !== 'function') {
      allReducers[prop] = deepCombineReducers(allReducers[prop]);
    }
  });
  return combineReducers(allReducers);
};

const createReducer = (asyncReducers = {}) => {
  let allReducers = { ...syncReducers, ...asyncReducers };
  return deepCombineReducers(allReducers);
};

// Generate a reducer to set the root state in dev mode for HMR
function stateSetter (reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: any, action: any) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

function logout (reducer: ActionReducer<MainState>): ActionReducer<MainState> {
  return function (state: MainState, action: any): MainState {
    if (action.type === '[User] Logout Success') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export function resetOnLogout (reducer: ActionReducer<MainState>): ActionReducer<MainState> {
  return function (state, action) {
    let newState;
    if (action.type === '[User] Logout Success') {
      newState = Object.assign({}, state);
      Object.keys(modules).forEach((key) => {
        newState[key] = modules[key]['initialState'];
      });
    }
    return reducer(newState || state, action);
  };
}

export const DEV_REDUCERS: MetaReducer<MainState>[] = [stateSetter, storeFreeze];
// set in constants.js file of project root
if (['logger', 'both'].indexOf(STORE_DEV_TOOLS) !== -1) {
  DEV_REDUCERS.push(storeLogger());
}
