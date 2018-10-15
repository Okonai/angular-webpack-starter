import { Modal } from '../models/modal.model';
import { ModalActions, modalActionTypes } from '..';

export interface ModalState {
  modals: Modal[];
  error?: any;
  loading: boolean;
  loaded: boolean;
  opened?: Modal;
}

const initialState: ModalState = {
  modals: [],
  loading: false,
  loaded: false
};

export function reducer(state: any = initialState, action: ModalActions): ModalState {
  const payload = action.payload;

  switch (action.type) {
    case modalActionTypes.LOAD_MODAL:
      return Object.assign({}, state, {
        loading: true
      });

    case modalActionTypes.LOAD_MODAL_ERROR:
      return Object.assign({}, state, {
        error: action.payload.error.message,
        loading: false,
        loaded: true
      });

    case modalActionTypes.LOAD_MODAL_SUCCESS:

      const modal = {
        hash: action.payload.modal.hashtag,
        html: action.payload.modal.content,
        title: action.payload.modal.title,
        type: action.payload.modal.type,
        customClass: action.payload.modal.class,
      };
      const modals = {
        [action.payload.modal.hashtag]: modal
      };

      return Object.assign({}, state, {
        modals: modals,
        loading: false,
        loaded: true,
      });

    case modalActionTypes.OPEN_MODAL:
      return Object.assign({}, state, {
        loading: true,
        opened: action.payload.modal
      });

    default:
      return state;
  }
}

export const getModals = (state: ModalState) => state.modals;
