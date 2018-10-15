
import {switchMap} from 'rxjs/operators';
import { Injectable} from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';

import * as promotionAcions from '@actions/promotion.action';
import * as productActions from '@actions/product.action';
import * as fromServices from '../services';

@Injectable()
export class PromotionEffects {
  @Effect()
  loadFrontpagePromotion$ = this.actions$
    .ofType<promotionAcions.LoadFrontpagePromotion>(promotionAcions.LOAD_FRONTPAGE_PROMOTION).pipe(
    switchMap(() => this.promotionService.getFrontpagePromotion()),
    switchMap(res => [
      new productActions.LoadProductsSuccessAction(res),
      // new productActions.ProductUpdateSuccessAction({ productVariables: res.productBasics }),
      new promotionAcions.LoadFrontpagePromotionSuccess(res)
    ]),);
    /*.catch(
      new promotionAcions.LoadFrontpagePromotionFail({status: res.status})
    );*/
  constructor(
    private actions$: Actions,
    private promotionService: fromServices.PromotionService
  ) {}

}
