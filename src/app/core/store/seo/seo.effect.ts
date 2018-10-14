
import {of as of,  Observable } from 'rxjs';

import {map, catchError, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SeoService } from './seo.service';
import * as seoActions from './seo.action';

@Injectable()
export class SeoEffects {

  @Effect()
  get$ = this.actions$
    .ofType< seoActions.SeoActions>(seoActions.seoActionTypes.LOAD).pipe(
    map((action: seoActions.SeoActions) => action.payload),
    switchMap(payload => {
      return this.seoService.get(payload.slug).pipe(
        map(res => new seoActions.LoadSeoSuccessAction({tags: res})),
        catchError(error => of(new seoActions.LoadSeoErrorAction({error: error}))));
    }));
    constructor (
      private seoService: SeoService,
      private actions$: Actions
    ) { }
}
