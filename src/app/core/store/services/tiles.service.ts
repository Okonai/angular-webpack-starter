import {Injectable} from '@angular/core';
import { ApplicationHttpClient } from '@core/services/http.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { Tile } from '@models/tiles.model';
import { API_PATH } from '@core/constants';


@Injectable()
export class TilesService {

  constructor(private http: ApplicationHttpClient) {}

  getTiles(): Observable<Tile[]> {
    return this.http
      .Get<{ tiles: Tile[] }>(API_PATH.main + `get-tiles`)
      .map(res => res.tiles || []);
  }
}
