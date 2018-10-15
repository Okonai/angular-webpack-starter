import { BillingAddress, ShippingAddress } from '@models/user.model';
import { Cart } from '@models/cart.model';
import { createEntityAdapter } from '@ngrx/entity';

export const stepAdapter = createEntityAdapter<Step>();
export const optionAdapter = createEntityAdapter<Option>();

export interface Step {
  id: number;
  title: string;
  options: Option[];
}

export interface Option {
  title: string;
  config: Config;
}

export interface Config {
  price?: Price[];
  needAddress?: boolean;
  description?: string;
  position?: number;
  title?: string;
  shipmentGroupId?: number;
  paymentId?: number;
  shipmentId?: number;
  forShipping?: number[];
}
export interface Price {
  value: number;
  from: number;
  to: number;
}

export interface Result {
  id: string;
  shipmentId: number;
  paymentId: number;
  isTransfer: boolean;
  cart: Cart;
  billingAddress: BillingAddress;
  shippingAddress: ShippingAddress;
}
