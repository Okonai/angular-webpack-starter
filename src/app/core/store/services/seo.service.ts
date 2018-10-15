import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Seo } from '@models/seo.model';

import { ApplicationHttpClient } from '@core/services/http.service';

@Injectable()
export class SeoService {

  constructor(private http: ApplicationHttpClient) { }

  get(slug: string): Observable<Seo> {
    return this.http
    .Get<{ tags: Seo } >(`base/get-meta?slug=${slug}`)
    .map(res => res.tags);
  }
}
