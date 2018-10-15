import * as fromTiles from '@actions/tiles.action';
import { Tile } from '@models/tiles.model';


export interface TilesState {
  data: Tile[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: TilesState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromTiles.TilesActions
): TilesState {

  switch (action.type) {
    case fromTiles.LOAD_TILES: {
      return {
        ...state,
        loading: true
      };
    }

    case fromTiles.LOAD_TILES_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        loading: false,
        loaded: true,
        data
      };
    }

    case fromTiles.LOAD_TILES_FAIL: {
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

export const getTilesLoading = (state: TilesState) => state.loading;
export const getTilesLoaded = (state: TilesState) => state.loaded;
export const getTiles = (state: TilesState) => state.data;
