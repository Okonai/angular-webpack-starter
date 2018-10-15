import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';

import {Observable} from 'rxjs/Observable';

import {UserService} from '../services/user.service';

import * as userActions from '../actions/user.action';
import * as authActions from '../actions/auth.action';
import * as modalActions from '../actions/modal.action';

@Injectable()
export class UserEffects {

   @Effect()
   public updateProfile: Observable<Action> = this.actions
       .ofType(userActions.userActionTypes.UPDATE_PROFILE)
       .map((action: userActions.UserActions) => action.payload)
       .switchMap(payload => {
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

        return this.userService.updateProfile(payload)
        .mergeMap(user => [
            new userActions.UpdateProfileSuccessAction(),
            new authActions.AuthLoadUser(),
            new modalActions.OpenModalAction({modal: successModal})
        ])
        .catch(error => Observable.of(
            new userActions.UpdateProfileErrorAction({error: error}),
            new modalActions.OpenModalAction({modal: errorModal})
        ));
       });

    @Effect()
    public setAddresses: Observable<Action> = this.actions
        .ofType(userActions.userActionTypes.SET_ADDRESS)
        .map((action: userActions.UserActions) => action.payload)
        .switchMap(payload => {
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

            return this.userService.setAddress(payload)
            .mergeMap(addresses => [
                new userActions.SetUserAddressSuccessAction(addresses),
                new modalActions.OpenModalAction({modal: successModal})
            ])
            .catch(error => Observable.of(
                new userActions.SetUserAddressErrorAction({error: error}),
                new modalActions.OpenModalAction({modal: errorModal})
            ));
        });

        @Effect()
        public deleteAddress: Observable<Action> = this.actions
            .ofType(userActions.userActionTypes.DELETE_ADDRESS)
            .map((action: userActions.UserActions) => action.payload)
            .switchMap(payload => {
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
             return this.userService.deleteAddress(payload)
             .mergeMap(payloadMap => [
                new userActions.DeleteUserAddressSuccessAction(payloadMap),
                new modalActions.OpenModalAction({modal: successModal})
             ])
             .catch(error => Observable.of(
                new userActions.UpdateProfileErrorAction({error: error}),
                new modalActions.OpenModalAction({modal: errorModal})
            ));
            });

    @Effect()
    public setPassword: Observable<Action> = this.actions
        .ofType(userActions.userActionTypes.SET_PASSWORD)
        .map((action: userActions.UserActions) => action.payload)
        .switchMap(payload => {
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

            return this.userService.setPassword(payload)
            .mergeMap(user => [
                new userActions.UpdateProfileSuccessAction(),
                new authActions.AuthLoadUser(),
                new modalActions.OpenModalAction({modal: successModal})
            ])
            .catch(error => {
                return Observable.of(
                    new userActions.UpdateProfileErrorAction({error: error}),
                    new modalActions.OpenModalAction({modal: errorModal})
                );
            });
        });

    @Effect()
    public loadAddresses: Observable<Action> = this.actions
        .ofType(userActions.userActionTypes.LOAD_ADDRESSES)
        .switchMap(() => {
            return this.userService.loadAddresses()
            .map(addresses => new userActions.LoadUserAddressesSuccessAction(addresses)
            )
            .catch(error => Observable.of(new userActions.LoadUserAddressesErrorAction({error: error})));
        });

    @Effect()
    public loadOrders: Observable<Action> = this.actions
        .ofType(userActions.userActionTypes.LOAD_ORDERS)
        .switchMap(() => {
            return this.userService.loadOrders()
            .map(orders => new userActions.LoadUserOrdersSuccessAction({orders: orders})
            )
            .catch(error => Observable.of(new userActions.LoadUserOrdersErrorAction({error: error})));
        });

    @Effect()
    public loadOrderDetails: Observable<Action> = this.actions
        .ofType(userActions.userActionTypes.LOAD_ORDER)
        .map((action: userActions.UserActions) => action.payload)
        .switchMap((payload) => {
            return this.userService.loadOrderDetails(payload)
            .map(order => new userActions.LoadUserOrderSuccessAction({order: order})
            )
            .catch(error => Observable.of(new userActions.LoadUserOrderErrorAction({error: error})));
        });




    /** @constructor
     * @param {Actions }actions
     * @param {UserService} userService
     */
    constructor(private actions: Actions,
                private userService: UserService) {
    }
}
