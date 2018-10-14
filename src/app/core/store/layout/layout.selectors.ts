import { createSelector } from '@ngrx/store';

import * as fromStore from '@store/index';

// Layout State
export const getLayoutState = createSelector(
    fromStore.getStoreState,
    (state: fromStore.MainState) => state.layout
);

export const getShowMenu = createSelector(getLayoutState, layout => layout.showMenu);
export const getShowSearch = createSelector(getLayoutState, layout => layout.showSearch);
export const getActiveBreakpoint = createSelector(getLayoutState, layout => layout.breakpoint);
export const getStoreSite = createSelector(getLayoutState, layout => layout.site);
export const getHeaderTemplate = createSelector(getLayoutState, layout => layout.headerTemplate);
