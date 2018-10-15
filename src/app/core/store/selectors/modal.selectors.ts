import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromModal from '../reducers/modal.reducer';

export const getModalState = createSelector(
    fromFeature.getStoreState,
    (state: fromFeature.MainState) => state.modal
);

export const getModals = createSelector(getModalState, fromModal.getModals);



