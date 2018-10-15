import { Injectable} from '@angular/core';

import { Effect, Actions} from '@ngrx/effects';
import { of ,  EMPTY as empty } from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as sliderActions from '../actions/slider.action';
import * as fromServices from '../services';
import {Slider} from '../models/slider.model';

@Injectable()
export class SliderEffects {

  @Effect()
  loadSlider$ = this.actions$
    .ofType<sliderActions.LoadSlider>(sliderActions.LOAD_SLIDER).pipe(
    switchMap(() => {
        return this.sliderService
          .getSlider().pipe(
            map((slider: Slider) => new sliderActions.LoadSliderSuccess(slider)),
            catchError(err => of(new sliderActions.LoadSliderFail(err)))
          );
      }
    ));
    constructor(
      private actions$: Actions,
      private sliderService: fromServices.SliderService
    ) {}
}
