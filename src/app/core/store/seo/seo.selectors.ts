import { createSelector } from '@ngrx/store';

import * as fromStore from '@store/index';
import * as fromSeo from './seo.reducer';

export const getSeoPageState = createSelector(
    fromStore.getStoreState,
    (state: fromStore.MainState) => state.seo
);

export const getSeo = createSelector(getSeoPageState, seo => seo.data);
export const getSeoLoading = createSelector(getSeoPageState, seo => seo.loading);
export const getSeoError = createSelector(getSeoPageState, seo => seo.error);
