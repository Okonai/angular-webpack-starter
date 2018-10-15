
import {switchMap, takeUntil, catchError, map, debounceTime, skip} from 'rxjs/operators';
import { Injectable } from '@angular/core';

// import @ngrx
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

// import rxjs
import { Observable ,  of , empty } from 'rxjs';

// import services
import { SearchService } from '../services/search.service';
import { SearchResult } from '../models/search.model';

// import actions
import {
  searchActionTypes,
  SearchActions,
  Search,
  SearchComplete,
  SearchError
} from '../actions/search.action';

@Injectable()
export class SearchEffect {

  @Effect()
  search$: Observable<Action> = this.actions
    .ofType<Search>(searchActionTypes.SEARCH).pipe(
    debounceTime(500),
    map(action => action.payload),
    switchMap(query => {
      if (query === '') {
        return empty();
      }

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
