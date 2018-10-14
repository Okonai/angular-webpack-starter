import * as cartActions from './cart.action';
import { Injectable } from '@angular/core';
import { MainState } from '@core/store';
import * as fromStore from '@core/store/index';
import { RootCart } from './cart.model';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, withLatestFrom } from 'rxjs/operators';
import { CartService } from './cart.service';

@Injectable()
export class CartEffects {
  @Effect({ dispatch: false })
  cartSync$ = this.actions$
    .ofType<cartActions.CartSync>(
      cartActions.cartActionTypes.CART_ADD,
      cartActions.cartActionTypes.CART_REMOVE,
      cartActions.cartActionTypes.CART_SYNC
    )
    .pipe(
      withLatestFrom(this.store$.select(fromStore.getCartState), this.store$.select(fromStore.isAuthenticated)),
      map(([action, cart, isAuthenticated]) => {
        if (isAuthenticated) {
          return this.cartService
            .syncCart(cart).pipe(
              map((response: RootCart) => new cartActions.CartSyncSuccess(response.cart)),
              catchError(err => of(new cartActions.CartSyncError(err)))
            );
        }
      })
    );

  constructor (
    private actions$: Actions,
    private cartService: CartService,
    private store$: Store<MainState>
  ) { }
}
