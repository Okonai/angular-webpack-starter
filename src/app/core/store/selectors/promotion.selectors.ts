import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromPromotion from '../reducers/promotion.reducer';
import * as _ from 'lodash';
import { getProductEntities } from '@selectors/product.selectors';

export const getPromotionState = createSelector(
    fromFeature.getStoreState,
    (state: fromFeature.MainState) => state.promotion
);

export const getPromotion = createSelector(getPromotionState, fromPromotion.getPromotion);
export const getPromotionLoaded = createSelector(getPromotionState, fromPromotion.getPromotionLoaded);
export const getPromotionLoading = createSelector(getPromotionState, fromPromotion.getPromotionLoading);

export const selectFrontpagePromotionProducts = createSelector(
    getPromotion, 
    getProductEntities,
    (promotion, entities) => {
        return _.map(promotion.productIds, (id) => {
            return entities[id];
        });
    }
)