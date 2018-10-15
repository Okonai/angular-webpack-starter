
import {of as observableOf,  Observable } from 'rxjs';

import {switchMap, map, catchError} from 'rxjs/operators';
import { Injectable} from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';

import * as StaticActions from '../actions/static.action';
import * as fromServices from '../services';

@Injectable()
export class StaticEffects {

  @Effect()
  loadStaticPage$ = this.actions$
    .ofType<StaticActions.StaticActions>(StaticActions.staticActionTypes.LOAD_STATIC).pipe(
    map((action: StaticActions.StaticActions) => action.payload),
    switchMap(payload => {
      return this.staticService.loadStaticPage(payload.staticId).pipe(
        map(staticPage => new StaticActions.LoadStaticSuccessAction({staticPage: staticPage})),
        catchError(error => observableOf(new StaticActions.LoadStaticErrorAction({error: error}))),);
    }),);

  constructor(
    private actions$: Actions,
    private staticService: fromServices.StaticService
  ) {}

}
