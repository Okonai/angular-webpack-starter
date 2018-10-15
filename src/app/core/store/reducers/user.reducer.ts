import { UserActions, userActionTypes } from '../actions/user.action';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Address, Order } from '../models/user.model';
import * as _ from 'lodash';

// import models

/**
 * The state.
 * @interface State
 */
export interface UserState {
    addresses?: AddressState;
    orders?: OrderState;
    loaded: boolean;
    loading: boolean;
    error?: string;
}

export interface AddressState extends EntityState<Address> {
    selectedAddressType: string;
    selectedAddressId: number;
    addressFormOpened: boolean;
}

export interface OrderState extends EntityState<Order> {
    selectActiveOnly: boolean;
    selectedOrderId: number;
    numberOfPages: number;
    currentPage: number;
    perPage: number;
    filters: {
        date: Date,
        order_number: string,
        status: String
    };
    dates: Date[];
    statuses: String[];
    order_numbers: Number[];
}

export const addressAdapter = createEntityAdapter<Address>();
export const orderAdapter = createEntityAdapter<Order>();

/**
 * The initial state.
 */
const initialState: UserState = {
    addresses: {
        selectedAddressType: '',
        selectedAddressId: null,
        addressFormOpened: false,
        ids: [],
        entities: {}
    },
    orders: {
        selectActiveOnly: false,
        selectedOrderId: null,
        numberOfPages: 0,
        currentPage: 1,
        perPage: 20,
        dates: [],
        statuses: [],
        order_numbers: [],
        filters: {
            date: null,
            order_number: null,
            status: null
        },
        ids: [],
        entities: {}
    },
    loaded: false,
    loading: false,
};

/**
 * The reducer function.
 * @function reducer
 * @param {State} state Current state
 * @param {Actions} action Incoming action
 */
export function reducer(state: any = initialState, action: UserActions): UserState {

    switch (action.type) {

        case userActionTypes.UPDATE_PROFILE:
            return {
                ...state,
                loading: true
            };

        case userActionTypes.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case userActionTypes.UPDATE_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };

        case userActionTypes.LOAD_ADDRESSES:
            return {
                ...state,
                loaded: false,
            };

        case userActionTypes.LOAD_ADDRESSES_SUCCESS:
            return {
                ...state,
                addresses: addressAdapter.addAll(action.payload, state.addresses),
                loading: false,
                loaded: true
            };

        case userActionTypes.UPDATE_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };


        case userActionTypes.SELECT_ADDRESS_TYPE:
            return {
                ...state,
                addresses: {
                    ...state.addresses,
                    selectedAddressType: action.payload.type,
                    selectedAddressId: null,
                    addressFormOpened: false,
                }
            };

        case userActionTypes.EDIT_ADDRESS:
            return {
                ...state,
                addresses: {
                    ...state.addresses,
                    addressFormOpened: true,
                    selectedAddressId: action.payload.id
                }
            };

        case userActionTypes.ADD_ADDRESS:
            return {
                ...state,
                addresses: {
                    ...state.addresses,
                    addressFormOpened: true,
                    selectedAddressId: 0,
                },
            };

        case userActionTypes.SET_ADDRESS:
            return {
                ...state,
                loading: true,
            };

        case userActionTypes.SET_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: addressAdapter.addMany(action.payload.addresses.addresses, {
                    ...state.addresses,
                    addressFormOpened: false,
                    selectedAddressId: 0,
                }),
            };

        case userActionTypes.DELETE_ADDRESS:
            return {
                ...state,
                loading: true,
            };


        case userActionTypes.DELETE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: addressAdapter.addMany(action.payload.addresses, {
                    ...state.addresses,
                    addressFormOpened: false,
                    selectedAddressId: 0,
                }),
            };


        case userActionTypes.SET_PASSWORD:
            return {
                ...state,
                loading: true
            };

        case userActionTypes.SET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case userActionTypes.SET_PASSWORD_ERROR:
            let error = action.payload;
            return {
                ...state,
                loading: false,
                loaded: false,
                error: error
            };

        case userActionTypes.LOAD_ORDERS:
            return {
                ...state,
                loading: true
            };

        case userActionTypes.LOAD_ORDERS_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: error
            };

        case userActionTypes.LOAD_ORDERS_SUCCESS:
            let orders = action.payload.orders;
            let dates: Date[] = Array();
            let statuses: String[] = Array();
            let orderNumbers: Number[] = Array();

            orders.map(o => {
                dates.push(new Date(o.order_submitted_at));
                statuses.push(o.status);
                orderNumbers.push(o.order_number);
            });

            return {
                ...state,
                orders: orderAdapter.addAll(orders, {
                    ...state.orders,
                    numberOfPages: Math.ceil(orders.length / state.orders.perPage),
                    currentPage: 1,
                    dates: _.uniq(dates),
                    statuses: _.uniq(statuses),
                    order_numbers: _.uniq(orderNumbers)
                }),
                loading: false,
                loaded: true
            };

        case userActionTypes.LOAD_ORDER:
            return {
                ...state,
                loading: true
            };

        case userActionTypes.LOAD_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: error
            };

        case userActionTypes.LOAD_ORDER_SUCCESS:
            let order = action.payload.order;
            return {
                ...state,
                orders: orderAdapter.updateOne(
                    { id: order.id, changes: order },
                    state.orders
                ),
                loading: false,
                loaded: true
            };

        case userActionTypes.SET_ORDER_FILTERS:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    filters: action.payload
                }
            };

        default:
            return state;
    }
}

export const getUserLoaded = (state: UserState) => state.loaded;
export const getUserLoading = (state: UserState) => state.loading;
