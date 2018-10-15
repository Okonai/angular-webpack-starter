import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLayout from '../reducers/layout.reducer';

export const getLayoutState = createFeatureSelector<fromLayout.LayoutState>('layout');

export const getShowMenu = createSelector(getLayoutState, fromLayout.getShowMenu);
export const getShowSearch = createSelector(getLayoutState, fromLayout.getShowSearch);
export const getStoreSite = createSelector(getLayoutState, fromLayout.getStoreSite);
export const getActiveBreakpoint = createSelector(getLayoutState, fromLayout.getActiveBreakpoint);
