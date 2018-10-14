import { createSelector } from '@ngrx/store';

import * as fromStore from '@store/index';
import * as fromNotification from './notification.reducer';

export const getNotificationState = createSelector(
    fromStore.getStoreState,
    (state: fromStore.MainState) => state.notification
);

export const getNotifications = createSelector(getNotificationState, notification => notification.notifications);
