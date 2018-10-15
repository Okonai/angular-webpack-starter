import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApplicationHttpClient } from '@core/services/http.service';
import { empty } from 'rxjs/Observer';
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
    .Get<{ modal: Modal } >(API_PATH.base + `get-modal?hash=${hash}`)
    .map((res) => {
      return res.modal;
    });
  }
}
