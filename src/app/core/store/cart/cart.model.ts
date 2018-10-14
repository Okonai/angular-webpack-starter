import { Product } from '@store/product';

export interface CartProduct {
    id: number;
    variable: CartProductVariable;
}

export interface CartProductVariable {
    quantity: number;
    services?: number[];
    validated_at?: string;
    hash?: string;
}

export interface Cart {
    products: CartProduct[];
}

export interface RootCart {
    cart: Cart;
    products?: Product[];
}
