import { createSelector } from '@ngrx/store';

import * as fromStore from '@store/index';
import * as fromUrlResolver from './url.reducer';

export const getResolvedUrlState = createSelector(
    fromStore.getStoreState,
    (state: fromStore.MainState) => state.url
);

export const getResolvedUrl = createSelector(getResolvedUrlState, url => url.resolvedUrl);
export const getResolvedControllerName = createSelector(getResolvedUrlState, url => url.resolvedUrl.controllerName);
export const getResolvedBreadCrumb = createSelector(getResolvedUrlState, url => url.resolvedUrl.breadCrumb);
