import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSlider from '../reducers/slider.reducer';

export const getSliderState = createFeatureSelector<fromSlider.SliderState>('slider');

export const getSlider = createSelector(getSliderState, fromSlider.getSlider);
export const getMainSlider = createSelector(getSliderState, fromSlider.getSlider, (blocks) => {
    return blocks.data.slideshow;
});
export const getMobileSlider = createSelector(getSliderState, fromSlider.getSlider, (blocks) => {
    return blocks.data.slideshow_mobile;
});
export const getSliderLoaded = createSelector(getSliderState, fromSlider.getSliderLoaded);
export const getSliderLoading = createSelector(getSliderState, fromSlider.getSliderLoaded);
