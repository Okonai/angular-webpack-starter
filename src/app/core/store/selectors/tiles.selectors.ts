import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromTiles from '../reducers/tiles.reducer';

export const getTilesState = createSelector(
    fromFeature.getStoreState,
    (state: fromFeature.MainState) => state.tiles
);

export const getTiles = createSelector(getTilesState, fromTiles.getTiles);
export const getTilesLoaded = createSelector(getTilesState, fromTiles.getTilesLoaded);
export const getTilesLoading = createSelector(getTilesState, fromTiles.getTilesLoading);
