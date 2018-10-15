import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromStatic from '../reducers/static.reducer';

export const getStaticPageState = createSelector(
    fromFeature.getStoreState,
    (state: fromFeature.MainState) => state.static
);

export const getStaticPage = createSelector(getStaticPageState, fromStatic.getStaticPage);
export const getStaticPageLoading = createSelector(getStaticPageState, fromStatic.getStaticPageLoading);
export const getStaticPageLoaded = createSelector(getStaticPageState, fromStatic.getStaticPageLoaded);



