import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { BannerService } from '../services/banner.service';
import * as bannerActions from '../actions/banner.action';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BannerEffects {
  @Effect()
  get$ = this.actions$
    .ofType<bannerActions.BannerActions>(bannerActions.BannerActionTypes.LOAD)
    .map((action: bannerActions.BannerActions) => action.payload)
    .switchMap(payload => {
      return this.bannerService.get(payload)
        .map(res => new bannerActions.LoadBannerSuccessAction(res))
        .catch(error => Observable.of(new bannerActions.LoadBannerErrorAction({error: error})));
    });
  constructor(
    private bannerService: BannerService,
    private actions$: Actions
  ) { }
}
