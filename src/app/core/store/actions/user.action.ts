import {Action} from '@ngrx/store';
import { Address, Password, Order } from '../models/user.model';
import { User } from '../models/auth.model';

export const userActionTypes = {
    UPDATE_PROFILE: '[User] Update profile',
    UPDATE_PROFILE_ERROR: '[User] Update profile error',
    UPDATE_PROFILE_SUCCESS: '[User] Update profile success',

    LOAD_ADDRESSES: '[User] Load User addresses',
    LOAD_ADDRESSES_ERROR: '[User] Load user addresses error',
    LOAD_ADDRESSES_SUCCESS: '[User] Load user addresses success',

    SET_ADDRESS: '[User] Update user addresses',
    SET_ADDRESS_ERROR: '[User] Update user addresses error',
    SET_ADDRESS_SUCCESS: '[User] Update user addresses success',

    DELETE_ADDRESS: '[User] Delete user addresses',
    DELETE_ADDRESS_ERROR: '[User] Delete user addresses error',
    DELETE_ADDRESS_SUCCESS: '[User] Delete user addresses success',

    SELECT_ADDRESS_TYPE: '[User] Selected address type',

    ADD_ADDRESS: '[User] Add new address',
    EDIT_ADDRESS: '[User] Editing address',

    SET_PASSWORD: '[User] Set user password',
    SET_PASSWORD_ERROR: '[User] Set user password error',
    SET_PASSWORD_SUCCESS: '[User] Set user password success',

    LOAD_ORDERS: '[User] Load User orders',
    LOAD_ORDERS_ERROR: '[User] Load user orders error',
    LOAD_ORDERS_SUCCESS: '[User] Load user orders success',

    LOAD_ORDER: '[User] Load User order',
    LOAD_ORDER_ERROR: '[User] Load user order error',
    LOAD_ORDER_SUCCESS: '[User] Load user order success',

    SET_ORDER_FILTERS: '[User] Set order filters',
};

export class UpdateProfileAction implements Action {
    public type: string = userActionTypes.UPDATE_PROFILE;

    constructor(public payload: { user: User }) {
    }
}

export class UpdateProfileSuccessAction implements Action {
    public type: string = userActionTypes.UPDATE_PROFILE_SUCCESS;

    constructor(public payload?: any) {
    }
}

export class UpdateProfileErrorAction implements Action {
    public type: string = userActionTypes.UPDATE_PROFILE_ERROR;

    constructor(public payload?: any) {
    }
}

export class LoadUserAddressesAction implements Action {
    public type: string = userActionTypes.LOAD_ADDRESSES;

    constructor(public payload?: any) {
    }
}

export class LoadUserAddressesSuccessAction implements Action {
    public type: string = userActionTypes.LOAD_ADDRESSES_SUCCESS;

    constructor(public payload?: any) {
    }
}


export class LoadUserAddressesErrorAction implements Action {
    public type: string = userActionTypes.LOAD_ADDRESSES_ERROR;

    constructor(public payload?: any) {
    }
}

export class SetUserAddressAction implements Action {
    public type: string = userActionTypes.SET_ADDRESS;

    constructor(public payload: { address: Address, type: string }) {
    }
}

export class SetUserAddressSuccessAction implements Action {
    public type: string = userActionTypes.SET_ADDRESS_SUCCESS;

    constructor(public payload?: any) {
    }
}

export class SetUserAddressErrorAction implements Action {
    public type: string = userActionTypes.SET_ADDRESS_ERROR;

    constructor(public payload?: any) {
    }
}

export class DeleteUserAddressAction implements Action {
    public type: string = userActionTypes.DELETE_ADDRESS;

    constructor(public payload: { type: string, id: number }) {
    }
}

export class DeleteUserAddressSuccessAction implements Action {
    public type: string = userActionTypes.DELETE_ADDRESS_SUCCESS;

    constructor(public payload?: any) {
    }
}

export class DeleteUserAddressErrorAction implements Action {
    public type: string = userActionTypes.DELETE_ADDRESS_ERROR;

    constructor(public payload?: any) {
    }
}

export class SelectAddressTypeAction implements Action {
    public type: string = userActionTypes.SELECT_ADDRESS_TYPE;

    constructor(public payload: {type: string}) {
    }
}

export class EditAddressAction implements Action {
    public type: string = userActionTypes.EDIT_ADDRESS;

    constructor(public payload: {id: number}) {
    }
}

export class AddAddressAction implements Action {
    public type: string = userActionTypes.ADD_ADDRESS;

    constructor(public payload?: any) {
    }
}

/**
 * Set password
 * @class SetPasswordAction
 * @implements {Action}
 */
export class SetPasswordAction implements Action {
    public type: string = userActionTypes.SET_PASSWORD;

    constructor(public payload: Password) {
    }
}

/**
 * Set password error
 * @class SetPasswordErrorAction
 * @implements {Action}
 */
export class SetPasswordErrorAction implements Action {
    public type: string = userActionTypes.SET_PASSWORD_ERROR;
    constructor(public payload?: any) {
    }
}

/**
 * Set password success
 * @class SetPasswordSuccessAction
 * @implements {Action}
 */
export class SetPasswordSuccessAction implements Action {
    public type: string = userActionTypes.SET_PASSWORD_SUCCESS;

    constructor(public payload: any) {
    }
}

export class LoadUserOrdersAction implements Action {
    public type: string = userActionTypes.LOAD_ORDERS;

    constructor(public payload?: any) {}
}

export class LoadUserOrdersErrorAction implements Action {
    public type: string = userActionTypes.LOAD_ORDERS_ERROR;

    constructor(public payload: any) {}
}

export class LoadUserOrdersSuccessAction implements Action {
    public type: string = userActionTypes.LOAD_ORDERS_SUCCESS;

    constructor(public payload: {orders: Order[]}) {}
}

export class LoadUserOrderAction implements Action {
    public type: string = userActionTypes.LOAD_ORDER;

    constructor(public payload: {id: number}) {}
}

export class LoadUserOrderErrorAction implements Action {
    public type: string = userActionTypes.LOAD_ORDER_ERROR;

    constructor(public payload: any) {}
}

export class LoadUserOrderSuccessAction implements Action {
    public type: string = userActionTypes.LOAD_ORDER_SUCCESS;

    constructor(public payload: {order: Order}) {}
}

export class SetOrderFiltersAction implements Action {
    public type: string = userActionTypes.SET_ORDER_FILTERS;

    constructor(public payload: {date: Date, order_number: number, status: string}) {}
}

/**
 * Actions type.
 * @type {Actions}
 */
export type UserActions
    = UpdateProfileAction
    | UpdateProfileErrorAction
    | UpdateProfileSuccessAction
    | LoadUserAddressesAction
    | LoadUserAddressesErrorAction
    | LoadUserAddressesSuccessAction
    | SelectAddressTypeAction
    | EditAddressAction
    | AddAddressAction
    | LoadUserOrderAction
    | LoadUserOrderErrorAction
    | LoadUserOrderSuccessAction
    | LoadUserOrdersAction
    | LoadUserOrdersErrorAction
    | LoadUserOrdersSuccessAction
    | SetOrderFiltersAction
    ;
