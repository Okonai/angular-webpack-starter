
import {switchMap, takeUntil, catchError, map, debounceTime, skip} from 'rxjs/operators';
import { Injectable } from '@angular/core';

// import @ngrx
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

// import rxjs
import { Observable ,  of ,  EMPTY as empty } from 'rxjs';
import { Search, searchActionTypes, SearchComplete, SearchError } from './search.action';
import { SearchResult } from './search.model';
import { SearchService } from '.';

@Injectable()
export class SearchEffect {

  @Effect()
  search$: Observable<Action> = this.actions
    .ofType<Search>(searchActionTypes.SEARCH).pipe(
    debounceTime(500),
    map(action => action.payload),
    switchMap(query => {
      const nextSearch$ = this.actions.ofType(searchActionTypes.SEARCH).pipe(skip(1));

      return this.searchService
        .search(query).pipe(
        takeUntil(nextSearch$),
        map((search: SearchResult) => new SearchComplete(search)),
        catchError(err => of(new SearchError(err))));
    }));

  constructor (private actions: Actions,
              private searchService: SearchService) {
  }
}
