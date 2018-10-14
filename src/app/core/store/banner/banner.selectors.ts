import { createSelector } from '@ngrx/store';

import * as fromStore from '@store/index';
import * as fromBanner from './banner.reducer';

export const getBannerPageState = createSelector(
    fromStore.getStoreState,
    (state: fromStore.MainState) => state.banner
);

export const getBanner = createSelector(getBannerPageState, banner => banner.data);
export const getBannerLoading = createSelector(getBannerPageState, banner => banner.loading);
export const getBannerLoaded = createSelector(getBannerPageState, banner => banner.loaded);
