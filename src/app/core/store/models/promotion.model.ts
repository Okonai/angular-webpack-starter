import { Status } from '@models/apiresponse.model';
import { Product } from '@models/product.model';

export interface Promotion {
    productIds: number[];
}

export interface PromotionResponse {
    products: Product[];
}
export interface StampImage {
    id: number;
    image: string;
}

/*
export interface Promotion {
    "id": number,
    "tax": number,
    "sku": string,
    "name": string
    "slug": string,
    "price": number,
    "promotion_price": number,
    "qty1": number,
    "qty2": number,
    "shipping_time": number
    "stamp_image": string,
    "image": string
  }
  */
