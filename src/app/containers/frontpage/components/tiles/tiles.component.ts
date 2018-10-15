import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Tile } from '@core/store/models/tiles.model';
import * as fromStore from '@core/store/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TilesComponent implements OnInit {

  tiles$: Observable<Tile[]>;
  breakpoint$: string;
  materialCols$: number;

  constructor(private store: Store<fromStore.MainState>) { }

  ngOnInit() {
    this.tiles$ = this.store.select(fromStore.getTiles);
    this.store.dispatch(new fromStore.LoadTiles());
    this.store.select(fromStore.getActiveBreakpoint).subscribe((breakpoint: string) => {
      if (breakpoint === 'small') {
        this.materialCols$ = 1;
      } else {
        this.materialCols$ = 4;
      }
      this.breakpoint$ = breakpoint;
    });
  }

}
