import {Injectable} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { Navigation } from '../models/navigation.model';
import { ApplicationHttpClient } from '@core/services/http.service';
import { API_PATH } from '@core/constants';

@Injectable()
export class NavigationService {

  constructor(private http: ApplicationHttpClient) {}

  getNavigation(): Observable<Navigation[]> {
    return this.http
      .Get<{ categories: Navigation[] }>(API_PATH.base + `get-header-categories`)
      .map(navigation => navigation.categories || []);
  }
}
