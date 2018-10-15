import { createSelector, createFeatureSelector } from '@ngrx/store';
import { getFilterProductIds } from '@selectors/filter.selectors';
import * as fromFeature from '@store/reducers';
import * as fromProduct from '@reducers/product.reducer';
import * as _ from 'lodash';

export const getProductState = createFeatureSelector<fromProduct.ProductState>('product');

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
