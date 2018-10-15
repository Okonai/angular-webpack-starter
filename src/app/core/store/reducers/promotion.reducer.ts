import * as fromPromotion from '@actions/promotion.action';
import { Promotion } from '@models/promotion.model';
import { Status } from '@models/apiresponse.model';
import * as _ from 'lodash';

export interface PromotionState {
  promotion: Promotion;
  status: Status;
}

export const initialState: PromotionState = {
  promotion: {
    productIds: null
  },
  status: {
    loaded: false,
    loading: false
  }
};

export function reducer(
  state = initialState,
  action: fromPromotion.PromotionActions
): PromotionState {

  switch (action.type) {
    case fromPromotion.LOAD_FRONTPAGE_PROMOTION: {
      return {
        ...state,
        status: {
          loading: true
        }
      };
    }

    case fromPromotion.LOAD_FRONTPAGE_PROMOTION_SUCCESS: {
      const productIds =  _.values(_.mapValues(action.payload.products, 'id'))
      return {
        ...state,
        status: {
          loading: false,
          loaded: true,
        },
        promotion: {
          productIds: productIds
        }
      };
    }

    case fromPromotion.LOAD_FRONTPAGE_PROMOTION_FAIL: {
      return {
        ...state,
        status: {
          loading: false,
          loaded: false
        }
      };
    }
    default:
      return state;
  }
}

export const getPromotionLoading = (state: PromotionState) => state.status.loading;
export const getPromotionLoaded = (state: PromotionState) => state.status.loaded;
export const getPromotion = (state: PromotionState) => state.promotion;
