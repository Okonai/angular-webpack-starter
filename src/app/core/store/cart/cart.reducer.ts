import * as fromCart from './cart.action';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as _ from 'lodash';
import { CartProduct } from './cart.model';
import { Status } from '@store/shared/apiresponse.model';

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
        const payloadQuantity = action.payload.changes.variable.quantity;
        _.set(action.payload, 'changes.variable.quantity', cartProductEntity.variable.quantity + payloadQuantity);
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
