import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Order, Address, Password } from '../models/user.model';
import { ApplicationHttpClient } from '../../services/http.service';
import { API_PATH } from '../../constants';
import { User } from '../models/auth.model';

/**
 * The user service.
 */
@Injectable()
export class UserService {

    constructor(private http: ApplicationHttpClient) {
    }

    /**
     * Update profile
     * @param {Address} payload
     * @returns {Observable<Address>}
     */
    updateProfile(payload: { user: User }): Observable<User> {
        return this.http.Post<Address>(
            API_PATH.profile + 'update-profile',
            payload.user
        );
    }

    loadAddresses(): Observable<Address[]> {
        return this.http
            .Get<{ addresses: Address[] }>(API_PATH.profile + 'get-distributor-addresses')
            .map(response => {
                return response.addresses;
            });
    }

    loadOrders(): Observable<Order[]> {
        return this.http
            .Get<{ orders: Order[] }>(API_PATH.profile + 'get-user-orders')
            .map(response => {
                return response.orders;
            });
    }

    loadOrderDetails(payload: { id: number }): Observable<Order> {
        return this.http
            .Get<{ order: Order }>(API_PATH.profile + 'get-user-order-details?id=' + payload.id)
            .map(response => {
                return response.order;
            });
    }

    /**
     * Update profile
     * @param {Address} payload
     * @returns {Observable<Address>}
     */
    setAddress(payload: { address: Address, type: string }): Observable<User> {
        switch (payload.type) {
            case 'shipping':
                return this.http.Post<Address>(
                    API_PATH.profile + 'set-distributor-shipping-address?id=' + payload.address.id,
                    payload.address
                );
            case 'billing':
                return this.http.Post<Address>(
                    API_PATH.profile + 'set-distributor-billing-address?id=' + payload.address.id,
                    payload.address
                );
            default:
                return ;
        }

    }

    /**
     * Update profile
     * @param {Address} payload
     * @returns {Observable<Address>}
     */
    deleteAddress(payload: { id: number, type: string }): Observable<Address> {
        switch (payload.type) {
            case 'shipping':
                return this.http.Get<Address>(
                    API_PATH.profile + 'remove-distributor-shipping-address?id=' + payload.id
                ).map(response => {
                    return response;
                });
            case 'billing':
                return this.http.Get<Address>(
                    API_PATH.profile + 'remove-distributor-billing-address?id=' + payload.id
                ).map(response => {
                    return response;
                });
            default:
                return ;
        }
    }

    /**
     * Updates password, required parameters oldPassword,newPassword
     */
    public setPassword(payload: { password: Password }): Observable<any> {
        return this.http.Post(API_PATH.profile + 'set-password',
            payload
        );
    }

}
