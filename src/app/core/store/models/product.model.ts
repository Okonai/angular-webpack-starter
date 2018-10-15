export interface Product {
    id: number;
    card: ProductCard;
    variable: ProductVariable;
    details: ProductDetail;
    extend?: ProductExtend;
}

export interface ProductExtend {
    images?: ProductImage[];
    details?: ProductDetail[];
    attributes?: ProductAttribute[];
    highlighted?: ProductAttribute[];
    services?: ProductService[];
    related?: number[];
}
export interface ProductVariable {
    price: ProductPrice;
    quantity: Quantity;
    services: ProductServiceGroup[];
}

export interface ProductPrice {
    price: number;
    promotion: number;
    tax: number;
}
export interface ProductCard {
    id: number;
    slug: string;
    category: number;
    name: string;
    sku: string;
    pcs: number;
    thumbnail: ProductImage;
}

export interface Quantity {
    local: boolean;
    storage: boolean;
    external: boolean;
}
export interface ProductImage {
    link: string;
    stamp: string;
}

export interface ProductDetail {
    icon_class: string;
    title: string;
    additional: string;
}

export interface ProductAttribute {
    id: string;
    type: string;
    name: string;
    value: string;
    unit: string;
    icon: string;
}

export interface ProductService {
    id: number;
    title: string;
    price: number;
}

export interface ProductServiceGroup {
    tax: number;
    name: string;
    description: string;
    services: ProductService[];
}

export interface ProductBreadcrumps {
}
