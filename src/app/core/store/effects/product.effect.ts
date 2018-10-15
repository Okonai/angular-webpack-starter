import { Injectable } from '@angular/core';

// import @ngrx
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

// import rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as productActions from '@actions/product.action';
import * as filterActions from '@actions/filter.action';

import { ProductService } from '@services/product.service';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class ProductEffects {

  @Effect()
  loadProducts$ = this.actions$
    .ofType<productActions.LoadProductsAction>(productActions.productActionTypes.LOAD_PRODUCTS)
    .map((action: productActions.LoadProductsAction) => action.payload)
    .switchMap(payload => {
      return this.productService.loadProducts(payload).pipe(
        mergeMap(response => {
          return [
            new productActions.LoadProductsSuccessAction(response),
            new filterActions.LoadFilterProductsSuccessAction(response),
          ];
        })
      )
    })
    .catch(error => Observable.of(new productActions.ProductUpdateErrorAction({ error: error })));

  @Effect()
  loadProduct$ = this.actions$
    .ofType<productActions.LoadProductAction>(productActions.productActionTypes.LOAD_PRODUCT)
    .map((action: productActions.ProductActions) => action.payload)
    .switchMap(payload => {
      return this.productService.loadProduct(payload.id)
        .map( response => new productActions.LoadProductSuccessAction(response))
        .catch(error => Observable.of(new productActions.LoadProductErrorAction({ error: error })));
    });

/*
  @Effect()
  productInfo: Observable<Action> = this.actions$
    .ofType(productActions.productActionTypes.PRODUCT_BASIC)
    .map((action: productActions.ProductBasicAction) => action.payload)
    .switchMap(payload => this.service.getProducts(payload.productIds))
    .switchMap(res => [
      new productActions.ProductBasicSuccessAction({ productBasics: res }),
      // new productActions.ProductUpdateSuccessAction({productVariables: res.variables})
    ])
    .catch(error => Observable.of(new productActions.ProductBasicErrorAction({ error: error })));

  @Effect()
  updateProduct$: Observable<Action> = this.actions$
    .ofType(productActions.productActionTypes.PRODUCT_UPDATE)
    .map((action: productActions.ProductActions) => action.payload)
    .switchMap(payload => this.service.updateProduct(payload.productId))
    .switchMap(res => [
      new productActions.ProductUpdateSuccessAction({ productVariables: res }),
      // new productActions.ProductUpdateSuccessAction({productId: res.productId, productVariable: variable}),
    ])
    .catch(error => Observable.of(new productActions.ProductUpdateErrorAction({ error: error })));

  @Effect()
  extendProduct$: Observable<Action> = this.actions$
    .ofType(productActions.productActionTypes.EXTEND_PRODUCT)
    .map((action: productActions.ProductActions) => action.payload)
    .switchMap(payload => {
      return this.service.getProduct(payload.productId)
        .map(extend => new productActions.ExtendProductSuccessAction({ productExtends: extend }))
        .catch(error => Observable.of(new productActions.ExtendProductErrorAction({ error: error })));
    });
*/
  constructor(
    private actions$: Actions,
    private service: ProductService,
    private productService: ProductService
  ) { }

}
