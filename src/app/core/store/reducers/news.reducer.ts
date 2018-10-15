import * as fromNews from '../actions/news.action';
import { News, NewsItem } from '../models/news.model';
import * as _ from 'lodash';


export interface NewsState {
  news: NewsItem[][];
  loaded: boolean;
  loading: boolean;
}

export const initialState: NewsState = {
  news: null,
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromNews.NewsActions
): NewsState {

  switch (action.type) {
    case fromNews.LOAD_NEWS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromNews.LOAD_NEWS_SUCCESS: {
      const news = _.orderBy(action.payload, ['is_highlight'], ['desc']);
      return {
        ...state,
        loading: false,
        loaded: true,
        news
      };
    }

    case fromNews.LOAD_NEWS_FAIL: {
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

export const getNewsLoading = (state: NewsState) => state.loading;
export const getNewsLoaded = (state: NewsState) => state.loaded;
export const getNews = (state: NewsState) => state.news;
