import { Injectable} from '@angular/core';

import { Effect, Actions} from '@ngrx/effects';

import * as ModalActions from '../actions/modal.action';
import * as fromServices from '../services';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalEffect {

  @Effect()
  loadModal$ = this.actions$
    .ofType<ModalActions.ModalActions>(ModalActions.modalActionTypes.LOAD_MODAL)
    .map((action: ModalActions.LoadModalAction) => action.payload)
    .switchMap(payload => {
      return this.modalService.loadModal(payload.hash)
        .map(modal => new ModalActions.LoadModalSuccessAction({modal: modal}))
        .catch(error => Observable.of(new ModalActions.LoadModalErrorAction({error: error})));
    });

  constructor(
    private actions$: Actions,
    private modalService: fromServices.ModalService
  ) {}

}
