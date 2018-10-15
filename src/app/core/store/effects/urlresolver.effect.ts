import { Injectable} from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';

import * as UrlResolverActions from '../actions/layout.action';
import * as fromServices from '../services';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UrlResolveEffect {

  @Effect()
  resolveUrl$ = this.actions$
    .ofType<UrlResolverActions.ResolveUrlAction>(UrlResolverActions.RESOLVE_URL)
    .map((action: UrlResolverActions.LayoutActions) => action.payload)
    .switchMap(payload => {
      return this.urlResolverService.resolveUrl(payload.slug)
        .map(response => new UrlResolverActions.ResolveUrlSuccessAction(response))
        .catch(error => Observable.of(new UrlResolverActions.ResolveUrlErrorAction({error: error})));
    });

  constructor(
    private actions$: Actions,
    private urlResolverService: fromServices.UrlResolverService
  ) {}

}
