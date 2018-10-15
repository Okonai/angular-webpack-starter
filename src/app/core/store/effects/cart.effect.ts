
import {withLatestFrom,  catchError, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';

import * as cartActions from '@actions/cart.action';
import * as fromStore from '@core/store/index';
import * as fromCart from '../services';
import { RootCart, Cart } from '@models/cart.model';
import { Store } from '@ngrx/store';
import { MainState } from '@core/store';

@Injectable()
export class CartEffects {
  @Effect({ dispatch: false })
  cartSync$ = this.actions$
    .ofType<cartActions.CartSync>(cartActions.cartActionTypes.CART_ADD, cartActions.cartActionTypes.CART_REMOVE, cartActions.cartActionTypes.CART_SYNC).pipe(
    withLatestFrom(this.store$.select(fromStore.getCartState), this.store$.select(fromStore.isAuthenticated)),
    map(([action, cart, isAuthenticated]) => {
      if (isAuthenticated) {
        return this.cartService
          .syncCart(cart).pipe(
            map((response: RootCart) => new cartActions.CartSyncSuccess(response.cart)),
            catchError(err => of(new cartActions.CartSyncError(err)))
          );
      }
    }),);

  constructor(
    private actions$: Actions,
    private cartService: fromCart.CartService,
    private store$: Store<MainState>
  ) { }
}
