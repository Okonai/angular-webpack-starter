
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  empty } from 'rxjs';
import { ApplicationHttpClient } from '@core/services/http.service';
import { Modal } from '@models/modal.model';
import swal from 'sweetalert2';
import { API_PATH } from '@core/constants';

/**
 * The product service.
 */
@Injectable()
export class ModalService {

  constructor(private http: ApplicationHttpClient) {}

  loadModal(hash: string): Observable<Modal> {
    return this.http
    .Get<{ modal: Modal } >(API_PATH.base + `get-modal?hash=${hash}`).pipe(
    map((res) => {
      return res.modal;
    }));
  }
}
