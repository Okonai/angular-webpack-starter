import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromModal from '../reducers/modal.reducer';

export const getModalState = createFeatureSelector<fromModal.ModalState>('modal');

export const getModals = createSelector(getModalState, fromModal.getModals);
