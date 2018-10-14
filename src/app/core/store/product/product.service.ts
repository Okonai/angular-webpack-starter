
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductExtend, ProductVariable, ProductCard, Product, ProductImage, ProductDetail, ProductAttribute } from './product.model';
import { ApplicationHttpClient } from '@core/services/http.service';
import { API_PATH } from '@core/constants';
import { ProductService } from './product.model';

/**
 * The product service.
 */
@Injectable()
export class ProductGetService {

  constructor (private http: ApplicationHttpClient) {}

  loadProducts (payload): Observable<{pager: {page: number, totalCount: number}, products: Product[]}> {
    return this.http
    .Get<{totalCount: number, page: number, products: Product[]}>(API_PATH.product + `get-products`, {params: payload}).pipe(
    map(response => {
      return {
        pager: {
          totalCount: response.totalCount,
          page: response.page
        },
        products: response.products,
      };
    }));
  }

  loadProduct (productId: number): Observable<{product: Product}> {
    return this.http
    .Get<{product: Product}>(API_PATH.product + `get-product?id=${productId}`).pipe(
    map(response => {
      return response;
    }));
  }

  loadProductImages (productId: number): Observable<ProductImage[]> {
    return this.http
    .Get<{ images: ProductImage[] } >(API_PATH.product + `get-product-images?product_id=${productId}`).pipe(
    map(res => res.images || []));
  }

  loadProductDetails (productId: number): Observable<ProductDetail[]> {
    return this.http
    .Get<{ infos: ProductDetail[] } >(API_PATH.product + `get-product-details?product_id=${productId}`).pipe(
    map(res => res.infos || []));
  }

  loadProductAttributes (productId: number): Observable<ProductAttribute[]> {
    return this.http
    .Get<{ grouped_attributes: ProductAttribute[] } >(API_PATH.product + `get-product-attributes?product_id=${productId}`).pipe(
    map(res => res.grouped_attributes || []));
  }

  loadProductHiglightedAttributes (productId: number): Observable<ProductAttribute[]> {
    return this.http
    .Get<{ highlighted: ProductAttribute[] } >(API_PATH.product + `get-product-highlighted-attributes?product_id=${productId}`).pipe(
    map(res => res.highlighted || []));
  }

  loadProductServices (productId: number): Observable<ProductService[]> {
    return this.http
    .Get<{ services: ProductService[] } >(API_PATH.product + `get-product-services?product_id=${productId}`).pipe(
    map(res => res.services || []));
  }
}
