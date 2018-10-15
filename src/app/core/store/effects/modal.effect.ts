
import {of as observableOf,  Observable } from 'rxjs';

import {switchMap, map, catchError} from 'rxjs/operators';
import { Injectable} from '@angular/core';

import { Effect, Actions} from '@ngrx/effects';

import * as ModalActions from '../actions/modal.action';
import * as fromServices from '../services';

@Injectable()
export class ModalEffect {

  @Effect()
  loadModal$ = this.actions$
    .ofType<ModalActions.ModalActions>(ModalActions.modalActionTypes.LOAD_MODAL).pipe(
    map((action: ModalActions.LoadModalAction) => action.payload),
    switchMap(payload => {
      return this.modalService.loadModal(payload.hash).pipe(
        map(modal => new ModalActions.LoadModalSuccessAction({modal: modal})),
        catchError(error => observableOf(new ModalActions.LoadModalErrorAction({error: error}))),);
    }),);

  constructor(
    private actions$: Actions,
    private modalService: fromServices.ModalService
  ) {}

}
