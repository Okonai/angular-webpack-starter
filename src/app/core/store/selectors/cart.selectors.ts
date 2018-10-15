import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromFeature from '../reducers';
import * as fromProducts from '@selectors/product.selectors';
import * as fromCart from '../reducers/cart.reducer';

export const getCartState = createFeatureSelector<fromCart.CartState>('cart');

export const getCartEntities = createSelector(
  getCartState,
  (cart) => cart.entities
);

export const getCartProductEntities = createSelector(
  getCartEntities,
  fromProducts.getProductEntities,
  (cartProducts, entities) => {
    return _.map(cartProducts, (cartProduct) => {
      return entities[cartProduct.id];
    });
  }
);
/*
export const getCart = createSelector(
  getCartState,

)
*/
