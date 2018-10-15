import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSearch from '../reducers/search.reducer';

export const getSearchState = createFeatureSelector<fromSearch.SearchState>('search');

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
