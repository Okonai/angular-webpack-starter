
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import { ApplicationHttpClient } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { API_PATH } from '@core/constants';


import { Filter, CategoryResponse} from '@models/filter.model';

@Injectable()
export class FilterService {

  constructor(private http: ApplicationHttpClient) {}

  getFilter(payload): Observable<Filter> {
    
    return this.http
    .Get<{ filters: Filter }>(API_PATH.category + `get-category-filter`, {params: payload}).pipe(
    map(response => {
      return {
        categories: response.filters.categories,
        stock:  response.filters.stock,
        manufacturers:  response.filters.manufacturers,
        price:  response.filters.price,
        header:  response.filters.header,
      };
    }));
  }

  getProducts(payload): Observable<CategoryResponse> {
    return this.http
    .Get<CategoryResponse>(API_PATH.category + `get-category-products`, {params: payload}).pipe(
    map(response => {
      return response;
    }));
  }

}
