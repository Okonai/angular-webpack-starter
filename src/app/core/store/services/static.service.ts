import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApplicationHttpClient } from '@core/services/http.service';
import { empty } from 'rxjs/Observer';
import { StaticPage } from '@models/static.model';
import { API_PATH } from '@core/constants';

/**
 * The product service.
 */
@Injectable()
export class StaticService {

  constructor(private http: ApplicationHttpClient) {}

  loadStaticPage(id: string): Observable<StaticPage> {
    return this.http
    .Get<{ staticPage: StaticPage}>(API_PATH.base + `get-static-page?id=${id}`)
    .map((res) => res.staticPage);
  }
}

