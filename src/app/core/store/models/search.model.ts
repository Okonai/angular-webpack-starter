export class SearchResult {
  products: SearchProduct[];
  categories: SearchCategory[];
}

export class SearchProduct {
  id: number;
  category_id: number;
  name: string;
  image: string;
  sku: string;
  tax: number;
  slug: string;
  price: number;
  promotion_price: number;
  sale_price: number;
}

export class SearchCategory {
  id: number;
  name: string;
  slug: string;
  price_min: number;
  tax_min: number;
  count: number;
}
