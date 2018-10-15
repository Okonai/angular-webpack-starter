import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLayout from '../reducers/layout.reducer';


// Layout State
export const getLayoutState = createSelector(
    fromFeature.getStoreState,
    (state: fromFeature.MainState) => state.layout
);

export const getShowMenu = createSelector(getLayoutState, fromLayout.getShowMenu);
export const getShowSearch = createSelector(getLayoutState, fromLayout.getShowSearch);
export const getStoreSite = createSelector(getLayoutState, fromLayout.getStoreSite);
export const getActiveBreakpoint = createSelector(getLayoutState, fromLayout.getActiveBreakpoint);

export const getSiteImage = createSelector(getLayoutState, fromLayout.getSiteImage, (site) => {
    return site.image;
});

