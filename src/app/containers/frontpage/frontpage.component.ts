import { Component, OnInit } from '@angular/core';

import * as fromStore from '@core/store/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { loaderAnimation } from '../../core/animations/loader.animation';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss'],
  animations: [
    loaderAnimation
  ]
})
export class FrontpageComponent implements OnInit {

  states = {
    slider: false,
    tiles: false,
    news: false,
    promotion: false
  };

  loadingFinished: Observable<boolean>;

  constructor(private store: Store<fromStore.MainState>) { }

  ngOnInit() {

    this.loadingFinished = Observable.combineLatest(
      this.store.select(fromStore.getSliderLoaded),
      this.store.select(fromStore.getTilesLoaded),
      this.store.select(fromStore.getNewsLoaded),
      (slider, tiles, news) => {
        return slider && tiles && news;
      });



    this.store.select(fromStore.getSliderLoaded).subscribe((loaded: boolean) => {
      this.states.slider = loaded;
    });

    this.store.select(fromStore.getTilesLoaded).subscribe((loaded: boolean) => {
      this.states.tiles = loaded;
    });

    this.store.select(fromStore.getNewsLoaded).subscribe((loaded: boolean) => {
      this.states.news = loaded;
    });

    this.store.select(fromStore.getPromotionLoaded).subscribe((loaded: boolean) => {
      this.states.promotion = true;
    });
  }

}
