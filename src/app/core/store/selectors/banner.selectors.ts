import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromBanner from '../reducers/banner.reducer';

export const getBannerPageState = createFeatureSelector<fromBanner.BannerState>('banner');

export const getBanner = createSelector(getBannerPageState, fromBanner.getBanner);
export const getBannerLoading = createSelector(getBannerPageState, fromBanner.getBannerLoading);
export const getBannerLoaded = createSelector(getBannerPageState, fromBanner.getBannerLoaded);
