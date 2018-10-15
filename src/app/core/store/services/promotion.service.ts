
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';

import { PromotionResponse } from '@models/promotion.model';
import { ApplicationHttpClient } from '@core/services/http.service';
import { API_PATH } from '@core/constants';

@Injectable()
export class PromotionService {

  constructor(private http: ApplicationHttpClient) {}

  getFrontpagePromotion(): Observable<PromotionResponse> {
    return this.http
      .Get<PromotionResponse>(API_PATH.product + `get-frontpage-promotion`).pipe(
      map(res => res));
  }
}
