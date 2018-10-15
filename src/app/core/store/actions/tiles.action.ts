import { Action} from '@ngrx/store';
import { Tile } from '@models/tiles.model';

// Load main-navigation

export const LOAD_TILES = '[Tiles] Load Tiles';
export const LOAD_TILES_FAIL = '[Tiles] Load Tiles Fail';
export const LOAD_TILES_SUCCESS = '[Tiles] Load Tiles Succeed';

export class LoadTiles implements Action {
  readonly type = LOAD_TILES;

  constructor(public payload?: any) {}
}

export class LoadTilesFail implements Action {
  readonly type = LOAD_TILES_FAIL;
  constructor(public payload: any) {}
}

export class LoadTilesSuccess implements Action {
  readonly type = LOAD_TILES_SUCCESS;
  constructor(public payload: Tile[]) {}
}

export type TilesActions
  = LoadTiles
  | LoadTilesFail
  | LoadTilesSuccess
  ;
