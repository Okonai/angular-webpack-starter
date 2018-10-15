
import {of as observableOf,  Observable } from 'rxjs';

import {switchMap, map, catchError} from 'rxjs/operators';
import { Injectable} from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';

import * as UrlResolverActions from '../actions/layout.action';
import * as fromServices from '../services';

@Injectable()
export class UrlResolveEffect {

  @Effect()
  resolveUrl$ = this.actions$
    .ofType<UrlResolverActions.ResolveUrlAction>(UrlResolverActions.RESOLVE_URL).pipe(
    map((action: UrlResolverActions.LayoutActions) => action.payload),
    switchMap(payload => {
      return this.urlResolverService.resolveUrl(payload.slug).pipe(
        map(response => new UrlResolverActions.ResolveUrlSuccessAction(response)),
        catchError(error => observableOf(new UrlResolverActions.ResolveUrlErrorAction({error: error}))),);
    }),);

  constructor(
    private actions$: Actions,
    private urlResolverService: fromServices.UrlResolverService
  ) {}

}
