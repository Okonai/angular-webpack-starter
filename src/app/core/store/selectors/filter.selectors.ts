import { createSelector } from '@ngrx/store';

import * as fromFeature from '@store/reducers';
import * as fromFilter from '@reducers/filter.reducer';

export const getFilterState = createSelector(
  fromFeature.getStoreState,
  (state: fromFeature.MainState) => state.filter
);

/*
export const {
    selectIds: getProductIds,
    selectEntities: getProductIEntities,
    selectAll: getProductIAll,
    selectTotal: getProductITotal
} = productAdapter.getSelectors(getFilterState);

*/
/**
 * Returns The Filter
 * @function getFilter
 * @param {State} state
 * @param {any} props
 * @return {Filter}
 */
export const getFilters = createSelector(getFilterState, fromFilter.getFilters);
export const getSelectedFilters = createSelector(getFilterState, fromFilter.getSelectedFilters);
export const getFilterLoaded = createSelector(getFilterState, fromFilter.getFilterLoaded);
export const getProductsloading = createSelector(getFilterState, fromFilter.getProductsLoading);

/**
 * Returns The Manufacturers of Filter
 * @function getFilterManufacturers
 * @param {State} state
 * @param {any} props
 * @return {Manufacturer[]}
 */
export const getFilterManufacturers = createSelector(getFilterState, fromFilter.getFilters, (filters) => {
  return filters.filters.manufacturers;
});

/**
 * Returns The Manufacturers of Filter
 * @function getFilterManufacturers
 * @param {State} state
 * @param {any} props
 * @return {Manufacturer[]}
 */
export const getFilterPrices = createSelector(getFilterState, fromFilter.getFilters, (filter) => {
  return filter.filters.price;
});

/**
 * Returns the sidebar status
 * @function getShowFilter
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const getShowFilter = createSelector(getFilterState, fromFilter.getFilters, (filter) => {
  return filter.promotion > 0;
});

/**
 * Returns the category selector
 * @function getShowFilterCategory
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const getShowFilterCategory = createSelector(getFilterState, fromFilter.getFilters, (filter) => {
  if ( filter.promotion === 0 ) {
    if (filter.filters.categories.length !== 0) {
      return true;
    } else {
      return false;
    }
  } else return false;
});


/**
 * Returns The Categories of Filter
 * @function getFilterCategories
 * @param {State} state
 * @param {any} props
 * @return {Category[]}
 */
export const getFilterCategories = createSelector(getFilterState, fromFilter.getFilters, (filter) => {
  return filter.filters.categories;
});

/**
 * Returns The Names of Filter
 * @function getFilterNames
 * @param {State} state
 * @param {any} props
 * @return {'names[]'}
 */
export const getFilterNames = createSelector(getFilterState, fromFilter.getFilters, (filter) => {
  return filter.filters['names[]'];
});

/**
 * Returns The stock of Filter
 * @function getFilterStock
 * @param {State} state
 * @param {any} props
 * @return {number}
 */
export const getFilterStock = createSelector(getFilterState, fromFilter.getFilters, (filter) => {
  return filter.selected['stock[]'];
});

/**
 * Returns The Names of Filter
 * @function getFilterTags
 * @param {State} state
 * @param {any} props
 * @return {'names[]'}
 */
export const getFilterTags = createSelector(getFilterState, fromFilter.getFilters, (filter) => {
  return filter.selected['names[]'];
});

/**
 * Returns The products of Filter
 * @function getFilterProducts
 * @param {State} state
 * @param {any} props
 * @return {Product[]}
 */
/*
export const getFilterProducts = createSelector(getFilterState, fromFilter.getFilters, (filter) => {
  return filter.products.getA;
});
*/
/*
export const getFilterProducts = createSelector(
    getFilterState,
    fromProduct.selectCurrentProduct
);
*/

/**
 * Returns The ViewMode of Filter
 * @function getViewMode
 * @param {State} state
 * @param {any} props
 * @return {string}
 */
export const getViewMode = createSelector(getFilterState, fromFilter.getFilters, (filter) => {
  return filter.view_mode;
});

/**
 * Returns The selected array of Filter
 * @function getFilterSelected
 * @param {State} state
 * @param {any} props
 * @return {SelectedModel}
 */
export const getFilterSelected = createSelector(getFilterState, fromFilter.getFilters, (filter) => {
  return filter.selected;
});

/**
 * Returns the category header contents
 * @function getFilterHeader
 * @param {State} state
 * @param {any} props
 * @return {Header}
 */
export const getFilterHeader = createSelector(getFilterState, fromFilter.getFilters, (filter) => {
  return filter.filters.header;
});

/**
 * Returns the selected sorting
 * @function getSort
 * @param {State} state
 * @param {any} props
 * @return {String}
 */
export const getSort = createSelector(getFilterState, fromFilter.getSelected, (selected) => {
  return selected.selected;
});

export const getFilterProductIds = createSelector(getFilterState, fromFilter.getFilterProductIds);

export const getFilterPager = createSelector(getFilterState, fromFilter.getFilterPager);
