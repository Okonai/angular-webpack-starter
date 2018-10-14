import {
  MetaReducer,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { routerReducer, RouterStateSerializer } from '@ngrx/router-store';

import * as fromRouter from '@ngrx/router-store';
import * as fromLayout from './layout';
import * as fromUrl from '@store/url/';
import * as fromNavigation from '@store/navigation';
import * as fromSearch from '@store/search';
import * as fromNotification from '@store/notification';
import * as fromSeo from '@store/seo';
import * as fromBanner from '@store/banner';
import * as fromAuth from '@store/auth';
import * as fromCart from '@store/cart';
import * as fromProduct from '@store/product';

export const getStoreState = createFeatureSelector<MainState>('store');

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface MainState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  layout: fromLayout.LayoutState;
  url: fromUrl.UrlState;
  navigation: fromNavigation.NavigationState;
  search: fromSearch.SearchState;
  notification: fromNotification.NotificationState;
  seo: fromSeo.SeoState;
  banner: fromBanner.BannerState;
  auth: fromAuth.AuthState;
  cart: fromCart.CartState;
  product: fromProduct.ProductState;
}

export const syncReducers = {
  router: routerReducer,
  layout: fromLayout.reducer,
  url: fromUrl.reducer,
  navigation: fromNavigation.reducer,
  search: fromSearch.reducer,
  notification: fromNotification.reducer,
  seo: fromSeo.reducer,
  banner: fromBanner.reducer,
  auth: fromAuth.reducer,
  cart: fromCart.reducer,
  product: fromProduct.reducer,
};

export const reducers: ActionReducerMap<MainState> = syncReducers;

export * from './layout/layout.selectors';
export * from './navigation/navigation.selectors';
export * from './search/search.selectors';
export * from './notification/notification.selectors';
export * from './auth/auth.selectors';
export * from './url/url.selectors';
export * from './seo/seo.selectors';
export * from './banner/banner.selectors';
export * from './cart/cart.selectors';
export * from './product/product.selectors';

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

export const DEV_REDUCERS: MetaReducer<MainState>[] = [stateSetter, storeFreeze];
// set in constants.js file of project root
if (['logger', 'both'].indexOf(STORE_DEV_TOOLS) !== -1) {
  DEV_REDUCERS.push(storeLogger());
}
