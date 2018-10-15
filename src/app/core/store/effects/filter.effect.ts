
import {of as observableOf,  Observable } from 'rxjs';

import {debounceTime, switchMap, map, withLatestFrom, catchError,  mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import * as _ from 'lodash';
import * as filterActions from '@actions/filter.action';
import * as productActions from '@actions/product.action';
import * as fromServices from '@store/services';
import * as fromStore from '@core/store/index';
import { Store } from '@ngrx/store';
import { MainState } from '@core/store';

@Injectable()
export class FilterEffects {

  @Effect()
  loadFilters$ = this.actions$
    .ofType<filterActions.LoadFilterAction>(filterActions.filterActionTypes.LOAD_FILTERS).pipe(
    debounceTime(300),
    map((action: filterActions.FilterActions) => action.payload),
    switchMap(payload => {
      return this.filterService
        .getFilter({ category: payload.category, promotion: payload.promotion }).pipe(
        map(filter => new filterActions.LoadFilterSuccessAction({filter: filter})),
        catchError(error => observableOf(
          new filterActions.LoadFilterErrorAction(error)
      )));
     }));

  @Effect()
  loadFilteredProducts$ = this.actions$
    .ofType<filterActions.SetFiltersAction>(filterActions.filterActionTypes.SET_FILTERS).pipe(
    withLatestFrom(this.store$.select(fromStore.getSelectedFilters)),
    map(([action, selected]) => {
      return selected;
    }),
    switchMap(payload => {
        return this.productService.loadProducts(payload).pipe(
        mergeMap(response => {
          return [
            new productActions.LoadProductsSuccessAction(response),
            new filterActions.LoadFilterProductsSuccessAction(response),
          ];
        })
      ).pipe(
      catchError(error => observableOf(new productActions.ProductUpdateErrorAction({ error: error }))));
    }));

  constructor (
    private actions$: Actions,
    private filterService: fromServices.FilterService,
    private productService: fromServices.ProductService,
    private store$: Store<MainState>
  ) { }
}
