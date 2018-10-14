import { createSelector } from '@ngrx/store';

import * as fromStore from '@store/index';
import * as fromNavigation from './navigation.reducer';

export const getNavigationState = createSelector(
    fromStore.getStoreState,
    (state: fromStore.MainState) => state.navigation
);

export const getNavigationLoading = createSelector(getNavigationState, nav => nav.loading);
export const getNavigationLoaded = createSelector(getNavigationState, nav => nav.loaded);
export const getNavigation = createSelector(getNavigationState, nav => nav.data);
