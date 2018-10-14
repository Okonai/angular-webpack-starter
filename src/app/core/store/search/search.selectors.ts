import { createSelector } from '@ngrx/store';

import * as fromStore from '@store/index';
import * as fromSearch from './search.reducer';

export const getSearchState = createSelector(
    fromStore.getStoreState,
    (state: fromStore.MainState) => state.search
);

export const getSearchResult = createSelector(getSearchState, fromSearch.getSearchResult);
export const getSearchQuery = createSelector(getSearchState, fromSearch.getSearchQuery);
export const getSearchResultProducts = createSelector(getSearchState, fromSearch.getSearchResult, (blocks) => {
    return blocks.data.products;
});
export const getSearchResultCategories = createSelector(getSearchState, fromSearch.getSearchResult, (blocks) => {
    return blocks.data.categories;
});
export const getSearchLoaded = createSelector(getSearchState, fromSearch.getSearchLoaded);
export const getSearchLoading = createSelector(getSearchState, fromSearch.getSearchLoading);
