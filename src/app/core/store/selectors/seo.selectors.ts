import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSeo from '../reducers/seo.reducer';

export const getSeoPageState = createFeatureSelector<fromSeo.SeoState>('seo');

export const getSeo = createSelector(getSeoPageState, fromSeo.getSeo);
export const getSeoLoading = createSelector(getSeoPageState, fromSeo.getSeoLoading);
export const getSeoErrro = createSelector(getSeoPageState, fromSeo.getSeoError);
