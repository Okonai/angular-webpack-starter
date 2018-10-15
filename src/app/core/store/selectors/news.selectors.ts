import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromNews from '../reducers/news.reducer';

export const getNewsState = createFeatureSelector<fromNews.NewsState>('news');

export const getNews = createSelector(getNewsState, fromNews.getNews);
export const getNewsLoaded = createSelector(getNewsState, fromNews.getNewsLoaded);
export const getNewsLoading = createSelector(getNewsState, fromNews.getNewsLoading);
