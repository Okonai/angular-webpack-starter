import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromNavigation from '../reducers/navigation.reducer';

export const getNavigationState = createFeatureSelector<fromNavigation.NavigationState>('navigation');

export const getNavigation = createSelector(getNavigationState, fromNavigation.getNavigation);
export const getNavigationLoaded = createSelector(getNavigationState, fromNavigation.getNavigationLoaded);
export const getNavigationLoading = createSelector(getNavigationState, fromNavigation.getNavigationLoading);
