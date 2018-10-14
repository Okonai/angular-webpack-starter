
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Seo } from './seo.model';

import { ApplicationHttpClient } from '@core/services/http.service';

@Injectable()
export class SeoService {

  constructor (private http: ApplicationHttpClient) { }

  get (slug: string): Observable<Seo> {
    return this.http
    .Get<{ tags: Seo } >(`base/get-meta?slug=${slug}`).pipe(
    map(res => res.tags));
  }
}
