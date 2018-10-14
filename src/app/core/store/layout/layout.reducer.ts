import * as layout from './layout.action';

export interface LayoutState {
  showMenu?: boolean;
  showSearch?: boolean;
  breakpoint?: string;
  loading: boolean;
  loaded: boolean;
  site: string;
  headerTemplate: string;
}

const initialState: LayoutState = {
  showMenu: false,
  showSearch: false,
  loading: false,
  loaded: false,
  site: 'SMARTSHOP',
  headerTemplate: 'sticky'
};

export function reducer (state = initialState, action: layout.LayoutActions): LayoutState {
  switch (action.type) {

    case layout.TOGGLE_MAIN_MENU:
      if ( state.showMenu === true) {
        return {
          ...state,
          showMenu: false
        };
      } else if (state.showMenu === false) {
        return {
          ...state,
          showMenu: true,
          showSearch: false
        };
      }
      break;

    case layout.OPEN_MAIN_MENU:
      return {
        ...state,
        showMenu: true,
        showSearch: false
      };

    case layout.CLOSE_MAIN_MENU:
      return {
        ...state,
        showMenu: false
      };

    case layout.TOGGLE_SEARCH:
      if (state.showSearch === true) {
        return {
          ...state,
          showSearch: false
        };
      } else if (state.showSearch === false) {
        return {
          ...state,
          showMenu: false,
          showSearch: true
        };
      }
      break;

    case layout.OPEN_SEARCH:
      return {
        ...state,
        showSearch: true,
        showMenu: false,
      };

    case layout.CLOSE_SEARCH:
      return {
        ...state,
        showSearch: false
      };

    case layout.UPDATE_CURRENT_BREAKPOINT:
      const windowSize = action.payload.windowSize;
      if ( windowSize < 768 ) {
        return {
          ...state,
          breakpoint : 'small'
        };
      } else if ( windowSize <  992 ) {
        return {
          ...state,
          breakpoint: 'medium'
        };
      } else {
        return {
          ...state,
          breakpoint : 'large'
        };
      }

    case layout.UPDATE_STORE_SITE:
      return {
        ...state,
        site: action.payload.site
      };

    case layout.SET_HEADER_TEMPLATE:
      return {
        ...state,
        headerTemplate: action.payload.template
      };

    default:
      return state;
  }
}
