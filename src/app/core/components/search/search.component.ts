
import {take} from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {SearchCategory, SearchProduct} from '../../store/models/search.model';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromStore from '../../store';
import { Router } from '@angular/router';
import { Navigation } from '../../store/models/navigation.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit {

  searchQuery$: Observable<string>;
  searchProducts$: Observable<SearchProduct[]>;
  searchCategories$: Observable<SearchCategory[]>;
  searchLoading$: Observable<boolean>;
  searchLoaded$: Observable<boolean>;
  searchOpened$: Observable<boolean>;
  query: string = '';
  root$: Observable<Navigation[]>;
  searchListLeftOffset: number;
  searchListWidth: number;
  @ViewChild('searchInput', {read: ElementRef}) tref: ElementRef;

  constructor (
    private store: Store<fromStore.MainState>,
    private router: Router,
  ) {

  }

  ngOnInit () {
    this.searchQuery$ = this.store.select(fromStore.getSearchQuery).pipe(take(1));
    this.searchCategories$ = this.store.select(fromStore.getSearchResultCategories);
    this.searchProducts$ = this.store.select(fromStore.getSearchResultProducts);
    this.searchLoading$ = this.store.select(fromStore.getSearchLoading);
    this.searchLoaded$ = this.store.select(fromStore.getSearchLoaded);
    this.searchOpened$ = this.store.select(fromStore.getShowSearch);
    this.root$ = this.store.select(fromStore.getNavigation);
  }

  ngAfterViewInit () {
    this.searchListLeftOffset = this.tref.nativeElement.offsetLeft;
    this.searchListWidth = this.tref.nativeElement.offsetWidth;
  }

  search (query: string) {
    this.store.dispatch(new fromStore.Search(query));
  }

  searchByTag () {
    this.router.navigate(['category'], { queryParams: { tag: this.query } });
  }

  toggleSearch () {
    this.store.dispatch(new fromStore.ToggleSearch());
  }

  openSearch () {
    this.store.dispatch(new fromStore.OpenSearch());
  }

  closeSearch () {
    this.store.dispatch(new fromStore.CloseSearch());
  }

}
