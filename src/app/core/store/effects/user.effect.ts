
import {of as observableOf, Observable} from 'rxjs';

import {catchError, mergeMap, switchMap, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';

import {UserService} from '../services/user.service';

import * as userActions from '../actions/user.action';
import * as authActions from '../actions/auth.action';
import * as modalActions from '../actions/modal.action';

@Injectable()
export class UserEffects {

   @Effect()
   public updateProfile: Observable<Action> = this.actions
       .ofType(userActions.userActionTypes.UPDATE_PROFILE).pipe(
       map((action: userActions.UserActions) => action.payload),
       switchMap(payload => {
        let successModal = {
            'id': 2,
            'title': 'Személyes adatok mentése sikeres',
            'content': '',
            'type': 'success',
            'class': 'set-address-success'
            };

        let errorModal = {
            'id': 2,
            'title': 'Személyes adatok mentése sikertelen',
            'content': '',
            'type': 'success',
            'class': 'set-address-error'
            };

        return this.userService.updateProfile(payload).pipe(
        mergeMap(user => [
            new userActions.UpdateProfileSuccessAction(),
            new authActions.AuthLoadUser(),
            new modalActions.OpenModalAction({modal: successModal})
        ]),
        catchError(error => observableOf(
            new userActions.UpdateProfileErrorAction({error: error}),
            new modalActions.OpenModalAction({modal: errorModal})
        )),);
       }),);

    @Effect()
    public setAddresses: Observable<Action> = this.actions
        .ofType(userActions.userActionTypes.SET_ADDRESS).pipe(
        map((action: userActions.UserActions) => action.payload),
        switchMap(payload => {
            let successModal = {
                'id': 2,
                'title': 'Cím mentése sikeres',
                'content': '',
                'type': 'success',
                'class': 'set-address-success'
                };

            let errorModal = {
                'id': 2,
                'title': 'Cím mentése sikertelen',
                'content': '',
                'type': 'error',
                'class': 'set-address-success'
                };

            return this.userService.setAddress(payload).pipe(
            mergeMap(addresses => [
                new userActions.SetUserAddressSuccessAction(addresses),
                new modalActions.OpenModalAction({modal: successModal})
            ]),
            catchError(error => observableOf(
                new userActions.SetUserAddressErrorAction({error: error}),
                new modalActions.OpenModalAction({modal: errorModal})
            )),);
        }),);

        @Effect()
        public deleteAddress: Observable<Action> = this.actions
            .ofType(userActions.userActionTypes.DELETE_ADDRESS).pipe(
            map((action: userActions.UserActions) => action.payload),
            switchMap(payload => {
             let successModal = {
                 'id': 2,
                 'title': 'Cím törlése sikeres',
                 'content': '',
                 'type': 'success',
                 };

             let errorModal = {
                 'id': 2,
                 'title': 'Cím törlése sikertelen',
                 'content': '',
                 'type': 'error',
                 };
             return this.userService.deleteAddress(payload).pipe(
             mergeMap(payloadMap => [
                new userActions.DeleteUserAddressSuccessAction(payloadMap),
                new modalActions.OpenModalAction({modal: successModal})
             ]),
             catchError(error => observableOf(
                new userActions.UpdateProfileErrorAction({error: error}),
                new modalActions.OpenModalAction({modal: errorModal})
            )),);
            }),);

    @Effect()
    public setPassword: Observable<Action> = this.actions
        .ofType(userActions.userActionTypes.SET_PASSWORD).pipe(
        map((action: userActions.UserActions) => action.payload),
        switchMap(payload => {
            let successModal = {
                'id': 2,
                'title': 'Új jelszó mentése sikeres',
                'content': '',
                'type': 'success',
                };

            let errorModal = {
                'id': 2,
                'title': 'Új jelszó mentése sikertelen',
                'content': '',
                'type': 'error',
                };

            return this.userService.setPassword(payload).pipe(
            mergeMap(user => [
                new userActions.UpdateProfileSuccessAction(),
                new authActions.AuthLoadUser(),
                new modalActions.OpenModalAction({modal: successModal})
            ]),
            catchError(error => {
                return observableOf(
                    new userActions.UpdateProfileErrorAction({error: error}),
                    new modalActions.OpenModalAction({modal: errorModal})
                );
            }),);
        }),);

    @Effect()
    public loadAddresses: Observable<Action> = this.actions
        .ofType(userActions.userActionTypes.LOAD_ADDRESSES).pipe(
        switchMap(() => {
            return this.userService.loadAddresses().pipe(
            map(addresses => new userActions.LoadUserAddressesSuccessAction(addresses)
            ),
            catchError(error => observableOf(new userActions.LoadUserAddressesErrorAction({error: error}))),);
        }));

    @Effect()
    public loadOrders: Observable<Action> = this.actions
        .ofType(userActions.userActionTypes.LOAD_ORDERS).pipe(
        switchMap(() => {
            return this.userService.loadOrders().pipe(
            map(orders => new userActions.LoadUserOrdersSuccessAction({orders: orders})
            ),
            catchError(error => observableOf(new userActions.LoadUserOrdersErrorAction({error: error}))),);
        }));

    @Effect()
    public loadOrderDetails: Observable<Action> = this.actions
        .ofType(userActions.userActionTypes.LOAD_ORDER).pipe(
        map((action: userActions.UserActions) => action.payload),
        switchMap((payload) => {
            return this.userService.loadOrderDetails(payload).pipe(
            map(order => new userActions.LoadUserOrderSuccessAction({order: order})
            ),
            catchError(error => observableOf(new userActions.LoadUserOrderErrorAction({error: error}))),);
        }),);




    /** @constructor
     * @param {Actions }actions
     * @param {UserService} userService
     */
    constructor(private actions: Actions,
                private userService: UserService) {
    }
}
