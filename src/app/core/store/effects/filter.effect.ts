import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import * as _ from 'lodash';
import * as filterActions from '@actions/filter.action';
import * as productActions from '@actions/product.action';
import * as fromServices from '@store/services';
import * as fromStore from '@core/store/index';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { MainState } from '@core/store';


@Injectable()
export class FilterEffects {

  @Effect()
  loadFilters$ = this.actions$
    .ofType<filterActions.LoadFilterAction>(filterActions.filterActionTypes.LOAD_FILTERS)
    .debounceTime(300)
    .map((action: filterActions.FilterActions) => action.payload)
    .switchMap(payload => {
      return this.filterService
        .getFilter({ category: payload.category, promotion: payload.promotion })
        .map(filter => new filterActions.LoadFilterSuccessAction({filter: filter}))
        .catch(error => Observable.of(
          new filterActions.LoadFilterErrorAction(error)
      ));
     });

  @Effect()
  loadFilteredProducts$ = this.actions$
    .ofType<filterActions.SetFiltersAction>(filterActions.filterActionTypes.SET_FILTERS)
    .withLatestFrom(this.store$.select(fromStore.getSelectedFilters))
    .map(([action, selected]) => {
      return selected
    })
    .switchMap(payload => {
        return this.productService.loadProducts(payload).pipe(
        mergeMap(response => {
          return [
            new productActions.LoadProductsSuccessAction(response),
            new filterActions.LoadFilterProductsSuccessAction(response),
          ];
        })
      )
      .catch(error => Observable.of(new productActions.ProductUpdateErrorAction({ error: error })));
    })
      

 
  /*@Effect()
  loadProducts$ = this.actions$
    .ofType<filterActions.FilterLoadProduct | filterActions.SetFiltersAction>(filterActions.filterActionTypes.LOAD_FILTER_PRODUCT, filterActions.filterActionTypes.SET_FILTERS)
    .debounceTime(300)
    .map((action: filterActions.FilterLoadProduct) => action.payload)
    .switchMap(payload => {
      console.log(payload);
      return this.filterService.getProducts(payload).pipe(
        mergeMap(response => {
          return [
            new productActions.ProductBasicSuccessAction({ productBasics: response.productBasics }),
            new filterActions.FilterLoadProductSuccess(response),
          ];
        })
      )
    })
    .catch(error => Observable.of(new productActions.ProductUpdateErrorAction({ error: error })));
  // .catch(new filterActions.FilterLoadProductError(err));*/
  
  constructor(
    private actions$: Actions,
    private filterService: fromServices.FilterService,
    private productService: fromServices.ProductService,
    private store$: Store<MainState>
  ) { }
}
