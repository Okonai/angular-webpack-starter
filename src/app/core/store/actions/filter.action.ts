import { Action } from '@ngrx/store';
import { Product } from '@models/product.model';
import { Selected, Filter } from '@models/filter.model';

export const filterActionTypes = {
  LOAD_FILTERS: '[Filter] Load Filter',
  LOAD_FILTERS_ERROR: '[Filter] Load Filter error',
  LOAD_FILTERS_SUCCESS: '[Filter] Load Filter success',

  LOAD_FILTER_PRODUCTS: '[Filter] Load Filter Products',
  LOAD_FILTER_PRODUCTS_ERROR: '[Filter] Load Filter Products error',
  LOAD_FILTER_PRODUCTS_SUCCESS: '[Filter] Load Filter Products success',

  SET_FILTERS: '[Filter] Set Filters',

  FILTER_TAG_LOAD: '[Filter] Tag Load',
  FILTER_TAG_ADD: '[Filter] Tag Added',
  FILTER_TAG_REMOVE: '[Filter] Tag Removed',
  FILTER_MAN_ADD: '[Filter] Man Added',
  FILTER_MAN_REMOVE: '[Filter] Man Removed',
  FILTER_REMOVE_ALL_MAN: '[Filter] Remove All Man',
  FILTER_ATTR_ADD: '[Filter] Attr Added',
  FILTER_ATTR_REMOVE: '[Filter] Attr Remove',
  FILTER_CHANGE_STOCK: '[Filter] Change stock',
  FILTER_SITE: '[Filter] Site',
  FILTER_CHANGE_VIEW_MODE: '[Filter] Change View Mode',
  FILTER_CHANGE: '[Filter] Change',
  FILTER_CHANGE_ERROR: '[Filter] Change Error',
  FILTER_CHANGE_SUCCESS: '[Filter] Change Success',
  SELECT_CATEGORY: '[Filter] Category Select',
  SELECT_PROMOTION: '[Filter] Promotion Select',
  SELECT_PROMOTION_SUCCESS: '[Filter] Promotion Select Success',
  SELECT_PROMOTION_ERROR: '[Filter] PRomotion Select Error',
  FILTER_SET_SORT: '[Filter] Set Sort',
  FILTER_LOAD_PAGE: '[Filter] Load Page',
  FILTER_CHANGE_PRICE: '[Filter] Change Price filter',
  FILTER_CHANGE_PRICE_ERROR: '[Filter] Change Price filter',
  FILTER_CHANGE_PRICE_SUCCESS: '[Filter] Change Price filter',
  FILTER_REMOVE_ALL: '[Filter] Remove all filter',
};

export class LoadFilterAction implements Action {
  readonly type = filterActionTypes.LOAD_FILTERS;

  constructor (public payload?: any) {}
}
export class LoadFilterErrorAction implements Action {
  readonly type = filterActionTypes.LOAD_FILTERS_ERROR;

  constructor (public payload?: any) {}
}

export class LoadFilterSuccessAction implements Action {
  readonly type = filterActionTypes.LOAD_FILTERS_SUCCESS;

  constructor (public payload: {filter: Filter}) {}
}

export class SetFiltersAction implements Action {
  readonly type = filterActionTypes.SET_FILTERS;

  constructor (public payload?: any) {}
}

export class LoadFilterProductsAction implements Action {
  readonly type = filterActionTypes.LOAD_FILTER_PRODUCTS;

  constructor (public payload?: Selected) {}
}

export class LoadFilterProductsErrorAction implements Action {
  readonly type = filterActionTypes.LOAD_FILTER_PRODUCTS_ERROR;

  constructor (public payload?: { products: Product[]}) {}
}

export class LoadFilterProductsSuccessAction implements Action {
  readonly type = filterActionTypes.LOAD_FILTER_PRODUCTS_SUCCESS;

  constructor (public payload?: any) {}
}

export class FilterTagLoad implements Action {
  readonly type = filterActionTypes.FILTER_TAG_LOAD;

  constructor (public payload?: any) {}
}

export class FilterTagAdd implements Action {
  readonly type = filterActionTypes.FILTER_TAG_ADD;

  constructor (public payload?: any) {}
}

export class FilterTagRemove implements Action {
  readonly type = filterActionTypes.FILTER_TAG_REMOVE;

  constructor (public payload?: any) {}
}

export class FilterChangeStock implements Action {
  readonly type = filterActionTypes.FILTER_CHANGE_STOCK;

  constructor (public payload?: any) {}
}

export class FilterChangeViewMode implements Action {
  readonly type = filterActionTypes.FILTER_CHANGE_VIEW_MODE;

  constructor (public payload?: any) {}
}

export class FilterChangeSuccess implements Action {
  readonly type = filterActionTypes.FILTER_CHANGE_SUCCESS;

  constructor (public payload?: any) {}
}

export class AddFilterManufacturer implements Action {
  readonly type = filterActionTypes.FILTER_MAN_ADD;

  constructor (public payload?: any) {}
}

export class RemoveFilterManufacturer implements Action {
  readonly type = filterActionTypes.FILTER_MAN_REMOVE;

  constructor (public payload?: any) {}
}

export class RemoveAllFilterManufacturer implements Action {
  readonly type = filterActionTypes.FILTER_REMOVE_ALL_MAN;

  constructor (public payload?: any) {}
}

export class SelectCategory implements Action {
  readonly type = filterActionTypes.SELECT_CATEGORY;

  constructor (public payload: number) {}
}

export class ChangePrice implements Action {
  readonly type = filterActionTypes.FILTER_CHANGE_PRICE;

  constructor (public payload: any[]) {}
}

export class FilterSetSort implements Action {
  readonly type = filterActionTypes.FILTER_SET_SORT;

  constructor (public payload: string) {}
}

export class FilterLoadPage implements Action {
  readonly type = filterActionTypes.FILTER_LOAD_PAGE;

  constructor (public payload: number) {}
}

export class RemoveAllFilter implements Action {
  readonly type = filterActionTypes.FILTER_REMOVE_ALL;

  constructor (public payload?: any) {}
}

export type FilterActions
  = LoadFilterAction
  | LoadFilterErrorAction
  | LoadFilterSuccessAction
  | SetFiltersAction
  | LoadFilterProductsAction
  | LoadFilterProductsErrorAction
  | LoadFilterProductsSuccessAction

  | FilterTagLoad
  | FilterTagAdd
  | FilterTagRemove
  | FilterChangeStock
  | FilterChangeViewMode
  | FilterChangeSuccess
  | AddFilterManufacturer
  | RemoveFilterManufacturer
  | RemoveAllFilterManufacturer
  | SelectCategory
  | FilterLoadPage
  ;
