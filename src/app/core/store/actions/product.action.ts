import { Action } from '@ngrx/store';
import { ProductExtend, ProductVariable, Product } from '../models/product.model';
import { Filter } from '@models/filter.model';

export const productActionTypes = {
  LOAD_PRODUCTS: '[Product] Load Products',
  LOAD_PRODUCTS_ERROR: '[Product] Load Products error',
  LOAD_PRODUCTS_SUCCESS: '[Product] Load Products success',

  LOAD_PRODUCT: '[Product] Load Product',
  LOAD_PRODUCT_ERROR: '[Product] Load Product error',
  LOAD_PRODUCT_SUCCESS: '[Product] Load Product success',

  PRODUCT_UPDATE: '[Product] Product Update',
  PRODUCT_UPDATE_ERROR: '[Product] Product Update Error',
  PRODUCT_UPDATE_SUCCESS: '[Product] Product Update Success',

  EXTEND_PRODUCT: '[Product] Extend Product',
  EXTEND_PRODUCT_ERROR: '[Product] Extend Product Error',
  EXTEND_PRODUCT_SUCCESS: '[Product] Extend Product Success',

  SELECT_PRODUCTS: '[Product] Selected Products',
};


export class LoadProductsAction implements Action {
  public type = productActionTypes.LOAD_PRODUCTS;

  constructor(public payload: {filter: Filter}) {}
}

export class LoadProductsErrorAction implements Action {
  public type = productActionTypes.LOAD_PRODUCTS_ERROR;

  constructor(public payload: any) {}
}

export class LoadProductsSuccessAction implements Action {
  public type = productActionTypes.LOAD_PRODUCTS_SUCCESS;

  constructor(public payload: {products: Product[]}) {}
}

export class LoadProductAction implements Action {
  public type = productActionTypes.LOAD_PRODUCT;

  constructor(public payload: {id: number}) {}
}

export class LoadProductErrorAction implements Action {
  public type = productActionTypes.LOAD_PRODUCT_ERROR;

  constructor(public payload: any) {}
}

export class LoadProductSuccessAction implements Action {
  public type = productActionTypes.LOAD_PRODUCT_SUCCESS;

  constructor(public payload: any) {}
}









export class ProductUpdateAction implements Action {
  public type: string = productActionTypes.PRODUCT_UPDATE;

  constructor(public payload: { productId: number }) { }
}

export class ProductUpdateErrorAction implements Action {
  public type: string = productActionTypes.PRODUCT_UPDATE_ERROR;

  constructor(public payload?: any) { }
}

export class ProductUpdateSuccessAction implements Action {
  public type: string = productActionTypes.PRODUCT_UPDATE_SUCCESS;

  constructor(public payload: { productVariables: ProductVariable[] }) { }
}

export class ExtendProductAction implements Action {
  public type: string = productActionTypes.EXTEND_PRODUCT;

  constructor(public payload: { productId: number }) { }
}

export class ExtendProductErrorAction implements Action {
  public type: string = productActionTypes.EXTEND_PRODUCT_ERROR;

  constructor(public payload?: any) { }
}

export class ExtendProductSuccessAction implements Action {
  public type: string = productActionTypes.EXTEND_PRODUCT_SUCCESS;

  constructor(public payload: { productExtends: ProductExtend[] }) { }
}

/**
 * Actions type.
 * @type {Actions}
 */
export type ProductActions
  = LoadProductsAction
  | LoadProductsErrorAction
  | LoadProductsSuccessAction

  | ExtendProductAction
  | ExtendProductErrorAction
  | ExtendProductSuccessAction
  ;
