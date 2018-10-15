import { Injectable} from '@angular/core';

import { Effect, Actions} from '@ngrx/effects';
import { of ,  EMPTY as empty } from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as newsActions from '../actions/news.action';
import * as fromServices from '../services';
import {News, NewsItem} from '../models/news.model';

@Injectable()
export class NewsEffects {

  @Effect()
  loadNews$ = this.actions$
    .ofType<newsActions.LoadNews>(newsActions.LOAD_NEWS).pipe(
    switchMap(() => {
        return this.newsService
          .getNews().pipe(
            map((news: News) => new newsActions.LoadNewsSuccess(news)),
            catchError(err => of(new newsActions.LoadNewsFail(err)))
          );
      }
    ));
  constructor(
    private actions$: Actions,
    private newsService: fromServices.NewsService
  ) {}
}
