import { ProductActions, productActionTypes } from '@actions/product.action';
import { FilterActions, filterActionTypes} from '@core/store/actions';
import { Product } from '@models/product.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Status } from '@models/apiresponse.model';
import * as _ from 'lodash';

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
      const related = product.extend.related;

      // Store only product IDs in the product.extend.related array
      _.set(product, 'extend.related',
        _.reduce(product.extend.related, (result, value) => {
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
