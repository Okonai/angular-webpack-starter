import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { SeoService } from '../services/seo.service';
import * as seoActions from '../actions/seo.action';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SeoEffects {

  @Effect()
  get$ = this.actions$
    .ofType< seoActions.SeoActions>(seoActions.seoActionTypes.LOAD)
    .map((action: seoActions.SeoActions) => action.payload)
    .switchMap(payload => {
      return this.seoService.get(payload.slug)
        .map(res => new seoActions.LoadSeoSuccessAction({tags: res}))
        .catch(error => Observable.of(new seoActions.LoadSeoErrorAction({error: error})));
    });
    constructor(
      private seoService: SeoService,
      private actions$: Actions
    ) { }
}
