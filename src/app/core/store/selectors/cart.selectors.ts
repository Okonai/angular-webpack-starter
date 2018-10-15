import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromFeature from '../reducers';
import * as fromProducts from '@selectors/product.selectors';


export const getCartState = createSelector(
  fromFeature.getStoreState,
  (state: fromFeature.MainState) => state.cart
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
