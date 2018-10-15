import { Injectable} from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';

import * as StaticActions from '../actions/static.action';
import * as fromServices from '../services';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StaticEffects {

  @Effect()
  loadStaticPage$ = this.actions$
    .ofType<StaticActions.StaticActions>(StaticActions.staticActionTypes.LOAD_STATIC)
    .map((action: StaticActions.StaticActions) => action.payload)
    .switchMap(payload => {
      return this.staticService.loadStaticPage(payload.staticId)
        .map(staticPage => new StaticActions.LoadStaticSuccessAction({staticPage: staticPage}))
        .catch(error => Observable.of(new StaticActions.LoadStaticErrorAction({error: error})));
    });

  constructor(
    private actions$: Actions,
    private staticService: fromServices.StaticService
  ) {}

}
