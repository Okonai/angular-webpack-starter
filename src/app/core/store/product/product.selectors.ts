import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromStore from '@store/index';
import * as fromProduct from './product.reducer';
import * as _ from 'lodash';
import { getFilterProductIds } from '@features-lazy/filter/store/filter.selectors';

export const getProductState = createSelector(
  fromStore.getStoreState,
  (state: fromStore.MainState) => state.product
);

export const selectProductState = createFeatureSelector<fromProduct.ProductState>('products');

export const {
  selectIds: getSelectedProductIds,
  selectEntities: getProductEntities,
  selectAll: getProductsAll,
  selectTotal: getProductstotal
} = fromProduct.productAdapter.getSelectors(getProductState);

export const selectCurrentProductId = createSelector(getProductState, fromProduct.getSelectedProductId);

export const getSelectedProduct = createSelector(
  getProductEntities,
  selectCurrentProductId,
  (productEntites, productId) => {
    const product = productEntites[productId];

    // Populate product.extend.related with product entities instead of IDs
    if (typeof product !== 'undefined') {
      _.set(product, 'extend.related', _.map(productEntites[productId].extend.related, id => {
        return productEntites[id];
      }));
    }
    return product;
  }
);

export const getFilterProducts = createSelector(
  getFilterProductIds,
  getProductEntities,
  (selectedIds, entities) => {
    return _.map(selectedIds, (id) => {
      return entities[id];
    });
  }
);

export const getProductLoading = createSelector(getProductState, fromProduct.getProductStatus, res => {
  return res.status.loaded;
});
