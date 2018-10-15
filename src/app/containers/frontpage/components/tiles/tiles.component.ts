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

  constructor (private store: Store<fromStore.MainState>) { }

  ngOnInit () {
    this.tiles$ = this.store.select(fromStore.getTiles);
    this.store.dispatch(new fromStore.LoadTiles());
  }
}
