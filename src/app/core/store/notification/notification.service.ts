
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationHttpClient } from '@core/services/http.service';
import { API_PATH } from '@core/constants';

/**
 * The product service.
 */
@Injectable()
export class NotificationService {

  constructor (private http: ApplicationHttpClient) {}

  loadNotification (hash: string): Observable<Notification> {
    return this.http
    .Get<{ modal: Notification } >(API_PATH.base + `get-modal?hash=${hash}`)
    .pipe(
      map((res) => {
        return res.modal;
      })
    );
  }
}
