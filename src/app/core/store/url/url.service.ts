import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ResolvedUrl, ParentCrumb } from './url.model';
import { ApplicationHttpClient } from '@core/services/http.service';
import { API_PATH } from '@core/constants';

@Injectable()
export class UrlResolverService {

  constructor (private http: ApplicationHttpClient) { }

  resolveUrl (slug: string): Observable<ResolvedUrl> {
    return this.http
      .Get<ResolvedUrl>(API_PATH.base + `resolve-url?slug=/${slug}`);
      // .map(response => response);
  }
}
