
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


import { Slider, Slide } from '@models/slider.model';
import { API_PATH } from '@core/constants';


import { ApplicationHttpClient } from '@core/services/http.service';

@Injectable()
export class SliderService {

  constructor(private http: ApplicationHttpClient) { }

  getSlider(): Observable<Slider> {
    return this.http
      .Get<{ slideshow: Slide[], slideshow_mobile: Slide[] }>(API_PATH.main + `get-banner-slideshow`).pipe(
      map(slides => {
        return {
          slideshow: slides.slideshow,
          slideshow_mobile: slides.slideshow_mobile
        };
      }));
  }
}
