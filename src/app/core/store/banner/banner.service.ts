
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationHttpClient } from '@core/services/http.service';
import { Banner } from './banner.model';
import { API_PATH } from '@core/constants';

@Injectable()
export class BannerService {

  constructor (private http: ApplicationHttpClient) { }

  get (payload): Observable<Banner> {
    return this.http
    .Get<{ banners: Banner } >(API_PATH.base + `get-banner`, {params: payload}).pipe(
    map(res => res.banners));
  }
}
