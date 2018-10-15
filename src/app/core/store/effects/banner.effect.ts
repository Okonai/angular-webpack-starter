
import {of as observableOf,  Observable } from 'rxjs';

import {map, catchError, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { BannerService } from '../services/banner.service';
import * as bannerActions from '../actions/banner.action';

@Injectable()
export class BannerEffects {
  @Effect()
  get$ = this.actions$
    .ofType<bannerActions.BannerActions>(bannerActions.BannerActionTypes.LOAD).pipe(
    map((action: bannerActions.BannerActions) => action.payload),
    switchMap(payload => {
      return this.bannerService.get(payload).pipe(
        map(res => new bannerActions.LoadBannerSuccessAction(res)),
        catchError(error => observableOf(new bannerActions.LoadBannerErrorAction({error: error}))));
    }));
  constructor (
    private bannerService: BannerService,
    private actions$: Actions
  ) { }
}
