import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SearchResult, SearchProduct, SearchCategory } from '../models/search.model';
import { ApplicationHttpClient } from '@core/services/http.service';
import { API_PATH } from '@core/constants';

@Injectable()
export class SearchService {
  constructor(private http: ApplicationHttpClient) {}

  search(querySearch: string): Observable<SearchResult> {
    return this.http
    .Get<{ products: SearchProduct[], categories: SearchCategory[] }>(API_PATH.base + `product-quick-search?q=${querySearch}`)
    .map(search => {
      return {
        products: search.products,
        categories: search.categories
      };
    });
  }
}
