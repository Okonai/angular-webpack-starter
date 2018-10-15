import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromNews from '../reducers/news.reducer';

export const getNewsState = createSelector(
    fromFeature.getStoreState,
    (state: fromFeature.MainState) => state.news
);

export const getNews = createSelector(getNewsState, fromNews.getNews);
export const getNewsLoaded = createSelector(getNewsState, fromNews.getNewsLoaded);
export const getNewsLoading = createSelector(getNewsState, fromNews.getNewsLoading);
