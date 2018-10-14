import { Action } from '@ngrx/store';
import { CartProduct, Cart } from './cart.model';

export const cartActionTypes = {
  CART_REMOVE: '[Cart] Remove',
  CART_ADD: '[Cart] Add',
  CART_SYNC: '[Cart] Sync',
  CART_SYNC_SUCCESS: '[Cart] Sync Success',
};

export class CartAdd implements Action {
  readonly type = cartActionTypes.CART_ADD;

  constructor (public payload?: any) { }
}

export class CartRemove implements Action {
  readonly type = cartActionTypes.CART_REMOVE;

  constructor (public payload?: any) { }
}

export class CartSync implements Action {
  readonly type = cartActionTypes.CART_SYNC;

  constructor (public payload?: any) { }
}

export class CartSyncSuccess implements Action {
  readonly type = cartActionTypes.CART_SYNC_SUCCESS;

  constructor (public payload?: any) { }
}
export class CartSyncError implements Action {
  readonly type = cartActionTypes.CART_SYNC_SUCCESS;

  constructor (public payload?: any) { }
}

export type CartActions
  = CartSync
  | CartSyncSuccess
  | CartSyncError
  | CartRemove
  | CartAdd
  ;
