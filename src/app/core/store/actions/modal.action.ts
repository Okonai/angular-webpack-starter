import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

export const modalActionTypes = {
  OPEN_MODAL: '[Layout] Open Modal',
  CLOSE_MODAL: '[Layout] Close Modal',
  LOAD_MODAL: '[Layout] Load Modal',
  LOAD_MODAL_ERROR: '[Layout] Load Modal Error',
  LOAD_MODAL_SUCCESS: '[Layout] Load Modal Success',
};

export class OpenModalAction implements Action {
  readonly type = modalActionTypes.OPEN_MODAL;
  constructor(public payload?: any) {
    swal(payload.modal);
  }
}

export class CloseModalAction implements Action {
  readonly type = modalActionTypes.CLOSE_MODAL;
  constructor(public payload?: any) {}
}

export class LoadModalAction implements Action {
  readonly type = modalActionTypes.LOAD_MODAL;
  constructor(public payload?: any) {}
}

export class LoadModalErrorAction implements Action {
  readonly type = modalActionTypes.LOAD_MODAL_ERROR;
  constructor(public payload?: any) {}
}

export class LoadModalSuccessAction implements Action {
  readonly type = modalActionTypes.LOAD_MODAL_SUCCESS;
  constructor(public payload?: any) {}
}

export type ModalActions
  =
  OpenModalAction
  | CloseModalAction
  | LoadModalAction
  | LoadModalErrorAction
  | LoadModalSuccessAction;
