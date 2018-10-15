import {Injectable} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { News } from '@models/news.model';
import { API_PATH } from '@core/constants';

import { ApplicationHttpClient } from '@core/services/http.service';

@Injectable()
export class NewsService {
  constructor(private http: ApplicationHttpClient) {}

  getNews(): Observable<News> {
    return this.http
    .Get<{news: News}>(API_PATH.main + `get-news-preview`)
    .map(res => res.news);
  }
}
