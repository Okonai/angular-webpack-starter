import { Promotion } from '@models/promotion.model';
import { Status } from '@models/apiresponse.model';

import {Action} from '@ngrx/store';
import { Product } from '@models/product.model';

export const LOAD_FRONTPAGE_PROMOTION = '[Promotion] Load Frontpage Promotion';
export const LOAD_FRONTPAGE_PROMOTION_FAIL = '[Promotion] Load Frontpage Promotion Fail';
export const LOAD_FRONTPAGE_PROMOTION_SUCCESS = '[Promotion] Load Frontpage Promotion Success';

export class LoadFrontpagePromotion implements Action {
  readonly type = LOAD_FRONTPAGE_PROMOTION;
  constructor() {}
}

export class LoadFrontpagePromotionFail implements Action {
  readonly type = LOAD_FRONTPAGE_PROMOTION_FAIL;
  constructor(public payload: { status: Status }) {}
}

export class LoadFrontpagePromotionSuccess implements Action {
  readonly type = LOAD_FRONTPAGE_PROMOTION_SUCCESS;
  constructor(public payload: { products: Product[]}) {}
}

export type PromotionActions
  = LoadFrontpagePromotion
  | LoadFrontpagePromotionFail
  | LoadFrontpagePromotionSuccess
  ;
