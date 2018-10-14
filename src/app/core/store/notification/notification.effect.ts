
import {of as of,  Observable } from 'rxjs';

import {switchMap, map, catchError} from 'rxjs/operators';
import { Injectable} from '@angular/core';

import { Effect, Actions} from '@ngrx/effects';

import * as NotificationActions from './notification.action';
import { NotificationService } from './notification.service';

@Injectable()
export class NotificationEffect {

  @Effect()
  loadNotification$ = this.actions$
    .ofType<NotificationActions.NotificationActions>(NotificationActions.notificationActionTypes.LOAD_MODAL).pipe(
    map((action: NotificationActions.LoadNotificationAction) => action.payload),
    switchMap(payload => {
      return this.notificationService.loadNotification(payload.hash).pipe(
        map(notification => new NotificationActions.LoadNotificationSuccessAction({notification: notification})),
        catchError(error => of(new NotificationActions.LoadNotificationErrorAction({error: error}))));
    }));

  constructor (
    private actions$: Actions,
    private notificationService: NotificationService
  ) {}

}
