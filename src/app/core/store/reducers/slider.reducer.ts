import * as fromSlider from '@actions/slider.action';
import { Slider } from '@models/slider.model';


export interface SliderState {
  data: Slider;
  loaded: boolean;
  loading: boolean;
}

export const initialState: SliderState = {
  data: {
    slideshow: [],
    slideshow_mobile: [],
  },
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromSlider.SliderActions
): SliderState {

  switch (action.type) {
    case fromSlider.LOAD_SLIDER: {
      return {
        ...state,
        loading: true
      };
    }

    case fromSlider.LOAD_SLIDER_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data
      };
    }

    case fromSlider.LOAD_SLIDER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    default:
      return state;
  }

}

export const getSliderLoading = (state: SliderState) => state.loading;
export const getSliderLoaded = (state: SliderState) => state.loaded;
export const getSlider = (state: SliderState) => state.data;
