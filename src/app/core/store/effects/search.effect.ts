import { Injectable } from '@angular/core';

// import @ngrx
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

// import rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/skip';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

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
    .ofType<Search>(searchActionTypes.SEARCH)
    .debounceTime(500)
    .map(action => action.payload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions.ofType(searchActionTypes.SEARCH).skip(1);

      return this.searchService
        .search(query)
        .takeUntil(nextSearch$)
        .map((search: SearchResult) => new SearchComplete(search))
        .catch(err => of(new SearchError(err)));
    });

  constructor(private actions: Actions,
              private searchService: SearchService) {
  }
}
