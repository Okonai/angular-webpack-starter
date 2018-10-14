import { Notification } from './notification.model';
import { NotificationActions, notificationActionTypes } from './notification.action';

export interface NotificationState {
  notifications: Notification[];
  error?: any;
  loading: boolean;
  loaded: boolean;
  opened?: Notification;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  loaded: false
};

export function reducer (state: any = initialState, action: NotificationActions): NotificationState {
  const payload = action.payload;

  switch (action.type) {
    case notificationActionTypes.LOAD_MODAL:
      return Object.assign({}, state, {
        loading: true
      });

    case notificationActionTypes.LOAD_MODAL_ERROR:
      return Object.assign({}, state, {
        error: action.payload.error.message,
        loading: false,
        loaded: true
      });

    case notificationActionTypes.LOAD_MODAL_SUCCESS:

      const notification = {
        hash: action.payload.notification.hashtag,
        html: action.payload.notification.content,
        title: action.payload.notification.title,
        type: action.payload.notification.type,
        customClass: action.payload.notification.class,
      };
      const notifications = {
        [action.payload.notification.hashtag]: notification
      };

      return Object.assign({}, state, {
        notifications: notifications,
        loading: false,
        loaded: true,
      });

    case notificationActionTypes.OPEN_MODAL:
      return Object.assign({}, state, {
        loading: true,
        opened: action.payload.notification
      });

    default:
      return state;
  }
}
