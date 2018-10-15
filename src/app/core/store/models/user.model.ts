import { Validators } from '@angular/forms';
import { createEntityAdapter } from '@ngrx/entity';
import { AddressState } from '@reducers/user.reducer';

export const addressAdapter = createEntityAdapter<Address>();

export class Address {
    id: number;
    type: string;
    country: string;
    city: string;
    zipCode: string;
    street: string;
    phone: string;
    isDefault: boolean;
}

export class BillingAddress extends Address {

}

export class ShippingAddress extends Address {
    extraAddress?: string;
    comment?: string;
}

export interface Password {
    passwordOld: string;
    password: string;
    passwordRepeat: string;
}

let addressFormGroup = {
    id: [''],
    type: [''],
    country: ['Magyarország'],
    city: ['', [
        Validators.required
    ]],
    zip_code: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
    ]],
    street: ['', [
        Validators.required
    ]],
    phone: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(9)
    ]],
    is_default: [''],
};

export  {addressFormGroup};

let billingAddressFormGroup =  {
    ...addressFormGroup,
};

export  {billingAddressFormGroup};

let shippingAddressFormGroup = {
    ...addressFormGroup,
    extra_address: ['', [
        Validators.required
    ]],
    comment: [''],
};

export  {shippingAddressFormGroup};

export interface Order {}


/**
 * The state.
 * @interface State
 */
export interface UserState {
    addresses?: AddressState;
    loaded: boolean;
    loading: boolean;
    error?: string;
}

export interface OrderItem {
    id: number;
    sku: string;
    name: string;
    price: string;
    qty: number;
    image: string;
    orderItemServices: any[];
}

export interface History {
    id: number;
    created_at: string;
    status: string;
    description: string;
}

export interface Order {
    id: number;
    order_submitted_at: Date;
    order_number: string;
    grand_total: number;
    status: string;
    shipment: string;
    payment: string;
    shipping_price?: number;
    orderItems?: OrderItem[];
    shipping_address?: ShippingAddress;
    billing_address?: BillingAddress;
    history?: History[];
}
