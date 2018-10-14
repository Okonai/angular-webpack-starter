import { ProductActions, productActionTypes } from './product.action';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Status } from '@core/store/shared/apiresponse.model';
import * as _ from 'lodash';
import { Product } from '@features-lazy/filter/store/filter.model';
import { FilterActions } from '@features-lazy/filter/store';

export const productAdapter = createEntityAdapter<Product>();

export interface ProductState extends EntityState<Product> {
    status: Status;
    selectedProductId: number | null;
}

const initialState: ProductState = productAdapter.getInitialState({
  status: {
    loaded: false,
    loading: false
  },
  selectedProductId: null
});

export function reducer (state: any = initialState, action: ProductActions | FilterActions): ProductState {

  switch (action.type) {
    case productActionTypes.LOAD_PRODUCTS:
      return {
        ...state,
        status: {
          loading: true,
          loaded: false,
          error: null,
        }
      };

    case productActionTypes.LOAD_PRODUCTS_ERROR:
      return {
        ...state,
        status: {
          error: action.payload.error.message,
          loading: false,
          loaded: true,
        }
      };

    case productActionTypes.LOAD_PRODUCTS_SUCCESS:
      return productAdapter.upsertMany(
        action.payload.products,
        {
          ...state,
          status: {
            error: null,
            loading: false,
            loaded: true,
          }
        }
      );

    case productActionTypes.LOAD_PRODUCT:
      return {
        ...state,
        status: {
          loading: true,
          loaded: false,
          error: null,
        }
      };

    case productActionTypes.LOAD_PRODUCT_ERROR:
      return {
        ...state,
        status: {
          error: action.payload.error.message,
          loading: false,
          loaded: true,
        }
      };

    case productActionTypes.LOAD_PRODUCT_SUCCESS:
      const product = action.payload.product;
      const related = product.changes.extend.related;

      // Store only product IDs in the product.extend.related array
      _.set(product, 'changes.extend.related',
        _.reduce(product.changes.extend.related, (result, value) => {
          result.push(value.id);
          return result;
        }, [])
      );

      // Updating the product entities with the product and the related products
      return productAdapter.upsertOne(
        product,
        productAdapter.upsertMany(related,
        {
          ...state,
          status: {
            error: null,
            loading: false,
            loaded: true,
          },
          selectedProductId: product.id,
        })
      );

    default:
      return state;
  }
}

export const getSelectedProductId = (state: ProductState) => state.selectedProductId;
export const getProductStatus = (state: ProductState) => state.status;
