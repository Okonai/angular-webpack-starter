
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import { ApplicationHttpClient } from '@core/services/http.service';

import { Observable } from 'rxjs';


import { Tile } from '@models/tiles.model';
import { API_PATH } from '@core/constants';


@Injectable()
export class TilesService {

  constructor(private http: ApplicationHttpClient) {}

  getTiles(): Observable<Tile[]> {
    return this.http
      .Get<{ tiles: Tile[] }>(API_PATH.main + `get-tiles`).pipe(
      map(res => res.tiles || []));
  }
}
