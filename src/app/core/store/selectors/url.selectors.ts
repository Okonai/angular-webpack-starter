import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUrlResolver from '../reducers/url.reducer';


export const getResolvedUrlState = createSelector(
    fromFeature.getStoreState,
    (state: fromFeature.MainState) => state.url
);

export const getResolvedUrl = createSelector(getResolvedUrlState, fromUrlResolver.getResolvedUrl);
export const getResolvedControllerName = createSelector(getResolvedUrlState, fromUrlResolver.getResolvedControllerName);
export const getResolvedBreadCrumb = createSelector(getResolvedUrlState, fromUrlResolver.getResolvedBreadCrumb);
