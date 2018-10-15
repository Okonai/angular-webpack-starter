import * as fromCart from '@actions/cart.action';
import { CartProduct, Cart } from '../models/cart.model';
import { Status } from '@models/apiresponse.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as _ from 'lodash';

export const cartAdapter = createEntityAdapter<CartProduct>();

export interface CartState extends EntityState<CartProduct> {
  status: Status;
}

const initialState: CartState = cartAdapter.getInitialState({
  status: {
    loaded: false,
    loading: false
  },
});

export function reducer (
  state = initialState,
  action: fromCart.CartActions
): CartState {

  switch (action.type) {

    case fromCart.cartActionTypes.CART_SYNC_SUCCESS: {
      return cartAdapter.addAll(action.payload, {
        ...state,
        status: {
          error: null,
          loading: false,
          loaded: true,
        },
      });
    }
    case fromCart.cartActionTypes.CART_ADD: {
      const cartProductEntity = state.entities[action.payload.id];
      if (cartProductEntity !== undefined) {
        const payloadQuantity = action.payload.variable.quantity;
        _.set(action.payload, 'variable.quantity', cartProductEntity.variable.quantity + payloadQuantity);
      }
      return cartAdapter.upsertOne(action.payload,
        {
          ...state,
          status: {
            error: null,
            loading: false,
            loaded: true,
          },
        });
    }

    case fromCart.cartActionTypes.CART_REMOVE: {
      return cartAdapter.removeOne(action.payload.id, state);
    }
    default:
      return state;
  }
}
