import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Slide} from '../../../../core/store/models/slider.model';
import * as fromStore from '../../../../core/store/index';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {

  slideshow$: Observable<Slide[]>;
  slideshow_mobile$: Observable<Slide[]>;
  showDesktopSlider: boolean;
  showMobileSlider: boolean;

  constructor (private store: Store<fromStore.MainState>) { }

  ngOnInit () {
    this.slideshow$ = this.store.select(fromStore.getMainSlider);
    this.slideshow_mobile$ = this.store.select(fromStore.getMobileSlider);
    this.store.dispatch(new fromStore.LoadSlider);
    this.store.select(fromStore.getActiveBreakpoint).subscribe((breakpoint: string) => {
      if ( breakpoint === 'small') {
        this.showDesktopSlider = false;
        this.showMobileSlider = true;
      } else {
        this.showDesktopSlider = true;
        this.showMobileSlider = false;
      }
    }).unsubscribe();
  }
}
