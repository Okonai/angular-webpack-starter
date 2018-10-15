import { Injectable} from '@angular/core';

import { Effect, Actions} from '@ngrx/effects';
import { of ,  EMPTY as empty } from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as navigationActions from '../actions/navigation.action';
import * as fromServices from '../services';
import {Navigation} from '../models/navigation.model';

@Injectable()
export class NavigationEffects {

  @Effect()
  loadNavigaton$ = this.actions$
    .ofType<navigationActions.LoadNavigation>(navigationActions.LOAD_NAVIGATION).pipe(
    switchMap(() => {
      return this.navigationService
          .getNavigation().pipe(
            map((navigation: Navigation[]) => new navigationActions.LoadNavigationSuccess(navigation)),
            catchError(err => of(new navigationActions.LoadNavigationFail(err)))
          );
      }
    ));
  constructor (
    private actions$: Actions,
    private navigationService: fromServices.NavigationService
  ) {}
}
