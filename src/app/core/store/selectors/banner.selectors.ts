import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromBanner from '../reducers/banner.reducer';

export const getBannerPageState = createSelector(
    fromFeature.getStoreState,
    (state: fromFeature.MainState) => state.banner
);

export const getBanner = createSelector(getBannerPageState, fromBanner.getBanner);
export const getBannerLoading = createSelector(getBannerPageState, fromBanner.getBannerLoading);
export const getBannerLoaded = createSelector(getBannerPageState, fromBanner.getBannerLoaded);



