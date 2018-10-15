import { Action} from '@ngrx/store';
import {Slider} from '../models/slider.model';

// Load main-navigation

export const LOAD_SLIDER = '[Slider] Load Slider';
export const LOAD_SLIDER_FAIL = '[Slider] Load Slider Fail';
export const LOAD_SLIDER_SUCCESS = '[Slider] Load Slider Success';

export class LoadSlider implements Action {
  readonly type = LOAD_SLIDER;

  constructor() {}
}

export class LoadSliderFail implements Action {
  readonly type = LOAD_SLIDER_FAIL;
  constructor(public payload: any) { }
}

export class LoadSliderSuccess implements Action {
  readonly type = LOAD_SLIDER_SUCCESS;
  constructor(public payload: Slider) {}
}

// action types
export type SliderActions
  = LoadSlider
  | LoadSliderFail
  | LoadSliderSuccess;
