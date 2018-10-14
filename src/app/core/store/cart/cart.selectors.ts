import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromStore from '@store/index';
import * as fromProducts from '@store/product/';

export const getCartState = createSelector(
  fromStore.getStoreState,
  (state: fromStore.MainState) => state.cart
);

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
