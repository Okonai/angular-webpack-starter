import * as filter from '@actions/filter.action';
import { Filter, FilterStatus, Selected } from '@models/filter.model';
import * as _ from 'lodash';

export interface FilterState {
  status: FilterStatus;
  view_mode: string;
  pager: {
    page: number,
    totalCount: number
  };
  filters: Filter;
  selected: Selected;
  products?: number[];
  promotion?: number;
  category?: number;
}

const SORT = {
  PRICE_ASC: 'priceasc',
  PRICE_DESC: 'pricedesc',
  ABC_ASC: 'abcasc',
  ABC_DESC: 'abcdesc',
  RELEVANT: 'relevant',
};

const initialState: FilterState = {
  status: {
    loading: false,
    productStatus: false
  },
  filters: {
    categories: [],
    manufacturers: [],
    price: [],
    header: null,
    stock: [],
    attributes: [],
  },
  selected: {
    category: null,
    'manufacturers[]': [],
    'price[]': [],
    'stock[]': [],
    'sort': 'relevant',
    attributes: [],
    page: 1,

  },
  view_mode: 'simple',
  products: [],
  pager: {
    page: 1,
    totalCount: 0
  }
};

export function reducer(state = initialState, action: filter.FilterActions): FilterState {

  switch (action.type) {
    case filter.filterActionTypes.LOAD_FILTERS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true
        }
      };

    case filter.filterActionTypes.LOAD_FILTERS_ERROR:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          loaded: false
        }
      };

    case filter.filterActionTypes.LOAD_FILTERS_SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          loaded: false
        },
        filters: action.payload.filter
      };

    case filter.filterActionTypes.SET_FILTERS:
      const selected = action.payload;
      return {
        ...state,
        selected: {
          ...state.selected,
          ...{
            category: action.payload.category,
            'manufacturers[]': selected.manufacturers.reduce(function(filtered, option, index) {
              if (option) {
                 filtered.push(state.filters.manufacturers[index].value);
              }
              return filtered;
            }, []),
            'stock[]': selected.stock.reduce(function(filtered, option, index) {
              if (option) {
                 filtered.push(state.filters.stock[index].value);
              }
              return filtered;
            }, []),
            'price[]': selected.price,
            page: selected.page,
            sort: selected.sort
          }
        },
        pager: {
          ...state.pager,
          page: selected.page
        }
      };


    case filter.filterActionTypes.LOAD_FILTER_PRODUCTS_SUCCESS:
      let ids = action.payload.products.map((product) => product.id);
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          productStatus: true,
        },
        products: ids,
        pager: action.payload.pager
      };
















    /*case filter.filterActionTypes.FILTER_TAG_ADD:
      return {
        ...state,
        selected: {
          ...state.selected,
          'names[]': state.selected['names[]'].concat(action.payload),
          page: 1
        },
        pager: {
          ...state.pager,
          current: 1
        }
      };

    case filter.filterActionTypes.FILTER_TAG_REMOVE:
      return {
        ...state,
        selected: {
          ...state.selected,
          'names[]': state.selected['names[]'].filter(function (item) { return item !== action.payload; }),
          page: 1
        },
        pager: {
          ...state.pager,
          current: 1
        }
      };

    case filter.filterActionTypes.FILTER_CHANGE_STOCK:
      return {
        ...state,
        selected: {
          ...state.selected,
          stock: action.payload,
          page: 1
        },
        pager: {
          ...state.pager,
          current: 1
        }
      };

    case filter.filterActionTypes.FILTER_CHANGE_PRICE:
      return {
        ...state,
        selected: {
          ...state.selected,
          'price[]': action.payload,
          page: 1
        },
        pager: {
          ...state.pager,
          current: 1
        }
      };
    case filter.filterActionTypes.LOAD_FILTER_PRODUCT:
      return {
        ...state,
        status: {
          ...state.status,
          productStatus: false,
          loading: true,
        }
      };
    case filter.filterActionTypes.LOAD_FILTER_PRODUCT_ERROR:
      return {
        ...state,
        status: {
          ...state.status,
          productStatus: false,
          loading: false,
          error: action.payload.message,
        }
      };
    case filter.filterActionTypes.LOAD_FILTER_PRODUCT_SUCCESS:
      let ids = action.payload.productBasics.map((basic) => basic.productInfo.id);
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          productStatus: true,
        },
        products: ids,
        pager: {
          ...state.pager,
          totalCount: action.payload.totalCount
        }
      };

    case filter.filterActionTypes.FILTER_SITE:
      if (window['location'].host.indexOf('parts') !== -1) {
        site = 'SMARTPARTS';
        viewMode = 'COMPACT';
      } else if (window['location'].host.indexOf('solution') !== -1) {
        site = 'SMARTSOLUTION';
      } else if (window['location'].host.indexOf('care') !== -1) {
        site = 'SMARTCARE';
      }
      return {
        ...state,
        site: site,
        view_mode: viewMode,
      };

    case filter.filterActionTypes.FILTER_CHANGE_VIEW_MODE:
      return {
        ...state,
        view_mode: action.payload,
      };

    case filter.filterActionTypes.FILTER_MAN_ADD:
      return {
        ...state,
        selected: {
          ...state.selected,
          'manufacturers[]': state.selected['manufacturers[]'].concat(action.payload.value),
          page: 1
        },
        pager: {
          ...state.pager,
          current: 1
        }
      };

    case filter.filterActionTypes.FILTER_MAN_REMOVE:
      return {
        ...state,
        selected: {
          ...state.selected,
          'manufacturers[]': state.selected['manufacturers[]'].filter(function (item) { return item !== action.payload.value; }),
          page: 1
        },
        pager: {
          ...state.pager,
          current: 1
        }
      };

    case filter.filterActionTypes.FILTER_REMOVE_ALL_MAN:
      return {
        ...state,
        selected: {
          ...state.selected,
          'manufacturers[]': [],
          page: 1,
        },
        pager: {
          ...state.pager,
          current: 1,
        }
      };
    case filter.filterActionTypes.SELECT_CATEGORY:

      return {
        ...state,
        selected: {
          ...state.selected,
          category: action.payload,
          page: 1,
          promotion: 0,
        },
        pager: {
          ...state.pager,
          current: 1,
        }
      };

    case filter.filterActionTypes.SELECT_PROMOTION:

      return {
        ...state,
        promotion: action.payload,
      };

    case filter.filterActionTypes.SELECT_PROMOTION_SUCCESS:

      return {
        ...state,
        promotion: action.payload,
      };

    case filter.filterActionTypes.FILTER_SET_SORT:

      return {
        ...state,
        selected: {
          ...state.selected,
          sort: action.payload,
          page: 1
        },
        pager: {
          ...state.pager,
          current: 1
        }
      };

    case filter.filterActionTypes.FILTER_LOAD_PAGE:
      return {
        ...state,
        selected: {
          ...state.selected,
          page: action.payload
        },
        pager: {
          ...state.pager,
          current: action.payload
        }
      };

    case filter.filterActionTypes.FILTER_REMOVE_ALL:
      return {
        ...state,
        selected: initialState.selected,
        pager: initialState.pager
      };*/

    default:
      return state;
  }
}

export const getFilters = (state: FilterState) => state.filters;
export const getSelectedFilters = (state: FilterState) => state.selected;
export const getFilterPager = (state: FilterState) => state.pager;
export const getSelected = (state: FilterState) => state.selected;
export const getFilterLoaded = (state: FilterState) => state.status.loaded;
export const getProductsLoading = (state: FilterState) => !state.status.productStatus;
export const getFilterProductIds = (state: FilterState) => state.products;
