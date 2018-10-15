import { Injectable} from '@angular/core';

import { Effect, Actions} from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import {catchError, map} from 'rxjs/operators';

import * as tilesActions from '../actions/tiles.action';
import * as fromServices from '../services';
import {Tile} from '../models/tiles.model';

@Injectable()
export class TilesEffects {

  @Effect()
  loadTiles$ = this.actions$
    .ofType<tilesActions.LoadTiles>(tilesActions.LOAD_TILES)
    .map((action: tilesActions.TilesActions) => action.payload)
    .switchMap(() => {
        return this.tilesService
          .getTiles().pipe(
            map((tiles: Tile[]) => new tilesActions.LoadTilesSuccess(tiles)),
            catchError(err => of(new tilesActions.LoadTilesFail(err)))
          );
      }
    );
  constructor(
    private actions$: Actions,
    private tilesService: fromServices.TilesService
  ) {}
}
