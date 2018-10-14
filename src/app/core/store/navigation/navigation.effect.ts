import { Injectable} from '@angular/core';

import { Effect, Actions} from '@ngrx/effects';
import { of ,  EMPTY as empty } from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as navigationActions from './navigation.action';
import { NavigationService } from './navigation.service';
import { Navigation } from './navigation.model';

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
    private navigationService: NavigationService
  ) {}
}
