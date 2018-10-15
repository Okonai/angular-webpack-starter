import { Status, Debug } from '@models/apiresponse.model';


export interface Selected {
  category: number;
  'manufacturers[]': Manufacturer[];
  'price[]': Price[];
  'stock[]'?: any[];
  attributes?: any[];
  page?: number;
  sort?: string;
}


export interface Category {
  value: number;
  label: string;
  slug: string;
}

export interface Manufacturer {
  value: number;
  label: string;
  selected?: boolean;
}

export interface Tags {
  value: string;
}

export interface Header {
  title: string;
  custom: string;
  image: string;
}

export interface Filter {
  categories: Category[];
  manufacturers: Manufacturer[];
  price: Price[];
  header: Header;
  stock?: any[];
  attributes?: any[];
}

export interface Price {
  value: number;
  label: string;
}

export interface AttributeValue {
  id: number;
  name: string;
  value: string;
  unit: string;
}
export interface GroupAttributeValue {
  name: string;
  attributes: AttributeValue[];
}
export interface Product {
  category_entity_id: number;
  product_manufacturer_id: number;
  default_image_id: number;
  vat_percent: number;
  price1: number;
  price: number;
  sku: string;
  qty1: number;
  qty2: number;
  slug: string;
  id: number;
  image: string;

  default_supplier_id?: any;
  promotion_price1?: number;
  promotion_price?: number;
  name_custom?: string;
  name?: string;
  shipping_time?: number;
  banner_id?: number;
  show_list_page?: boolean;
  show_between_products?: boolean;
  active?: boolean;
  stamp_image?: string;
  highlightedAttributes?: AttributeValue[];
  attributesToShow?: GroupAttributeValue[];
  warranty?: string;
}

export interface GroupAttributeValue {
  name: string;
  attributes: AttributeValue[];
}

export interface Pager {
  totalCount: number;
  count: number;
  current: number;
  overall: number;
  pages: number[];
}
export interface CategoryResponse {
  count: number;
  totalCount: number;
  page: number;
  products: Product[];
  debug?: Debug;
}
export interface FilterStatus extends Status {
  productStatus: boolean;
}
