import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

export const notificationActionTypes = {
  OPEN_MODAL: '[Layout] Open Notification',
  CLOSE_MODAL: '[Layout] Close Notification',
  LOAD_MODAL: '[Layout] Load Notification',
  LOAD_MODAL_ERROR: '[Layout] Load Notification Error',
  LOAD_MODAL_SUCCESS: '[Layout] Load Notification Success',
};

export class OpenNotificationAction implements Action {
  readonly type = notificationActionTypes.OPEN_MODAL;
  constructor (public payload?: any) {
    swal(payload.notification);
  }
}

export class CloseNotificationAction implements Action {
  readonly type = notificationActionTypes.CLOSE_MODAL;
  constructor (public payload?: any) {}
}

export class LoadNotificationAction implements Action {
  readonly type = notificationActionTypes.LOAD_MODAL;
  constructor (public payload?: any) {}
}

export class LoadNotificationErrorAction implements Action {
  readonly type = notificationActionTypes.LOAD_MODAL_ERROR;
  constructor (public payload?: any) {}
}

export class LoadNotificationSuccessAction implements Action {
  readonly type = notificationActionTypes.LOAD_MODAL_SUCCESS;
  constructor (public payload?: any) {}
}

export type NotificationActions
  =
  OpenNotificationAction
  | CloseNotificationAction
  | LoadNotificationAction
  | LoadNotificationErrorAction
  | LoadNotificationSuccessAction;
