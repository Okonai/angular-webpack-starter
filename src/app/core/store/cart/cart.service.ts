import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApplicationHttpClient } from '@core/services/http.service';

import { API_PATH } from '@core/constants';
import { CartState } from './cart.reducer';
import { RootCart } from './cart.model';
import { map } from 'rxjs/operators';
import { CartItem } from './cart_old.model';

@Injectable()
export class CartService {

  constructor (private _http: ApplicationHttpClient) { }

  /**
   * Validating the whole cart
   * @return {Observable<Cart>} [description]
   */
  public syncCart (cart: CartState): Observable<RootCart> {
    console.log(cart);
    return this._http
      .Post<RootCart>(API_PATH.cart + `merge-cart`, cart)
      .pipe(
        map(response => {
          console.log(response);
          return response;
        })
      );
  }
  /**
   * DEPRECATED
   * @param product
   */
  public addProduct (product: CartItem): Observable<RootCart> {
    return this._http
      .Post<RootCart>(API_PATH.cart + `add-product`, product)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  /**
   * DEPRECATED
   * @param product
   */
  public removeProduct (product: CartItem): Observable<RootCart> {

    return this._http
      .Post<RootCart>(API_PATH.cart + `remove-product`, product)
      .pipe(
        map(response => {
          console.log(response);
          return response;
        })
      );
  }

}
