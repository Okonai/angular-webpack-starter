import { Injectable } from '@angular/core';
import * as filterActions from '@features-lazy/filter/store/';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as productActions from './product.action';
import { ProductGetService } from './product.service';

@Injectable()
export class ProductEffects {

  @Effect()
  loadProducts$ = this.actions$
    .ofType<productActions.LoadProductsAction>(productActions.productActionTypes.LOAD_PRODUCTS).pipe(
    map((action: productActions.LoadProductsAction) => action.payload),
    switchMap(payload => {
      return this.productService.loadProducts(payload).pipe(
        mergeMap(response => {
          return [
            new productActions.LoadProductsSuccessAction(response),
            new filterActions.LoadFilterProductsSuccessAction(response),
          ];
        })
      );
    }),
    catchError(error => of(new productActions.ProductUpdateErrorAction({ error: error }))));

  @Effect()
  loadProduct$ = this.actions$
    .ofType<productActions.LoadProductAction>(productActions.productActionTypes.LOAD_PRODUCT).pipe(
    map((action: productActions.ProductActions) => action.payload),
    switchMap(payload => {
      return this.productService.loadProduct(payload.id).pipe(
        map( response => new productActions.LoadProductSuccessAction(response)),
        catchError(error => of(new productActions.LoadProductErrorAction({ error: error }))));
    }));

  constructor (
    private actions$: Actions,
    private productService: ProductGetService
  ) { }

}
