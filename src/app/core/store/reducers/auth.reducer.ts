import * as auth from '../actions/auth.action';
import { Login, AuthForm, User, LoginResponse, Register, RegisterResponse, Popup, ForgotResponse, ForgotForm } from '../models/auth.model';

export interface AuthState {
  user: User;
  authForm: AuthForm;
  forgotForm: ForgotForm;
  forgotResponse: ForgotResponse;
  popup: Popup;
  loading: boolean;
  loaded: boolean;
}

const initialState: AuthState = {
  user: {
    email: null,
    access_token: null
  },
  authForm: {
    email: undefined,
    error: false,
  },
  forgotForm: {
    code: null,
  },
  forgotResponse: {
    status: null,
  },
  popup: {
    message: '',
    title: '',
    type: '',
  },
  loading: false,
  loaded: false
};

export function reducer (state = initialState, action: auth.AuthActions): AuthState {

  switch (action.type) {
    case auth.authActionTypes.AUTH_SET_ACCESS_TOKEN:
      return {
        ...state,
        user: Object.assign({}, state.user, {
          access_token: action.payload.user.access_token
        }),
      };
    case auth.authActionTypes.AUTH_SET_EMAIL:
      return {
        ...state,
        authForm: action.payload.auth_form
      };

      case auth.authActionTypes.AUTH_LOAD_USER:
      return {
        ...state,
        loading: true
      };

    case auth.authActionTypes.AUTH_LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.load_response,
        loading: false,
        loaded: true
      };

    case auth.authActionTypes.AUTH_IS_USER_SUCCESS:
      return {
        ...state,
        authForm: Object.assign({}, state.authForm, {
          page: action.payload.is_user_response.status ? 'login' : (window['site'] === 'SMARTSHOP' ? 'register' : 'register-distributor'),
          picture: action.payload.is_user_response.picture ? action.payload.is_user_response.picture : undefined,
          loading: false,
        }),
      };
    case auth.authActionTypes.AUTH_BACK_TO_AUTH:
      return {
        ...state,
        authForm: Object.assign({}, state.authForm, {
          page: undefined,
          error: false,
          save: false,
        }),
        popup: {
          message: null,
          type: null,
          title: null,
        },
        forgotResponse: {
          status: null,
        }
      };

    case auth.authActionTypes.AUTH_FORGOT_PASSWORD_UPDATE:
      return {
        ...state,
        forgotResponse: Object.assign({}, state.forgotResponse, {
          loading: true,
        }),
      };

    case auth.authActionTypes.AUTH_FORGOT_PASSWORD_UPDATE_ERROR:
      return {
        ...state,
        forgotResponse: Object.assign({}, state.forgotResponse, {
          loading: false,
          status: false,
        }),
      };
     case auth.authActionTypes.AUTH_RESET:
      return {
        ...state,
        authForm: Object.assign({}, state.authForm, {
          page: undefined,
          error: false,
          save: false,
        }),
        forgotResponse: Object.assign({}, state.forgotResponse, {
          loading: false,
          status: null,
        }),
      };

    case auth.authActionTypes.AUTH_FORGOT_PASSWORD_UPDATE_SUCCESS:

      if (state.authForm.save) {
        window.localStorage.setItem('access_token', action.payload.forgot_response.access_token);
      } else {
        window.sessionStorage.setItem('access_token', action.payload.forgot_response.access_token);
      }
      return {
        ...state,
        user: Object.assign({}, state.user, {
          access_token: action.payload.forgot_response.access_token,
        }),
        authForm: Object.assign({}, state.authForm, {
          page: 'forgot-success',
          error: false,
          save: false,
        }),
        forgotResponse: Object.assign({}, state.forgotResponse, {
          loading: false,
          status: null,
        }),
      };
    case auth.authActionTypes.AUTH_FORGOT_PASSWORD_UPDATE_RESET:
    return {
        ...state,
        forgotResponse: Object.assign({}, state.forgotResponse, {
          status: null,
        }),
      };

    case auth.authActionTypes.AUTH_REGISTER:
      return {
        ...state,
        authForm: Object.assign({}, state.authForm, {
          loading: true,
        }),
      };

    case auth.authActionTypes.AUTH_REGISTER_SUCCESS:

      /**
       * Important to handle this, because the SHOP need to auto-login but solution & parts is not.
       */
      let tempUser = state.user;
      if (action.payload.register_response.access_token !== '') {
        tempUser = Object.assign({}, state.user, {
          access_token: action.payload.register_response.access_token,
        });
        window.sessionStorage.setItem('access_token', action.payload.register_response.access_token);
      }
      return {
        ...state,
        user: tempUser,
        authForm: Object.assign({}, state.authForm, {
          page: 'register-success',
          loading: false,
        }),
      };
    case auth.authActionTypes.AUTH_REGISTER_ERROR:
      return {
        ...state,
        popup: {
          message: action.payload.register_response.message,
          type: 'error',
          title: 'Váratlan hiba történt.',
        },
        authForm: Object.assign({}, state.authForm, {
          loading: false,
        }),
      };

    case auth.authActionTypes.AUTH_LOGOUT:
      window.localStorage.clear();
      window.sessionStorage.clear();
      return {
        ...state,
        user: {
          access_token: null
        },
        authForm: Object.assign({}, state.authForm, {
          error: false,
          loading: false,
          page: undefined,
        }),
      };
    case auth.authActionTypes.AUTH_LOGIN:
    return {
      ...state,
      authForm: Object.assign({}, state.authForm, {
        error: false,
        loading: true,
        save: action.payload.auth_form.save,
      }),
    };
    case auth.authActionTypes.AUTH_LOGIN_SUCCESS:
      if (state.authForm.save) {
        window.localStorage.setItem('access_token', action.payload.login_response.access_token);
      } else {
        window.sessionStorage.setItem('access_token', action.payload.login_response.access_token);
      }
      return {
        ...state,
        user: action.payload.login_response,
        authForm: Object.assign({}, state.authForm, {
          error: false,
          loading: false,
          page: 'login-success',
        }),
      };

    case auth.authActionTypes.AUTH_LOGIN_ERROR:
    return {
      ...state,
      authForm: Object.assign({}, state.authForm, {
        error: true,
        loading: false,
      }),
    };
    case auth.authActionTypes.AUTH_FORGOT_PASSWORD_ADD_CODE:
    return {
      ...state,
      forgotForm: Object.assign({}, state.forgotForm, {
        code: action.payload.forgot_form.code,
      }),
    };
    case auth.authActionTypes.AUTH_NEXT_STEP:
        return {
        ...state,
      };
    default:
      return state;
  }
}

export const getAuth = (state: AuthState) => state;

/**
 * Returns true if the user is authenticated.
 * @function isAuthenticated
 * @param {State} state
 * @returns {boolean}
 */
export const isAuthenticated = (state: AuthState) => state.user.access_token != null;

/**
 * Returns true if the authenticated has loaded.
 * @function isAuthenticatedLoaded
 * @param {State} state
 * @returns {boolean}
 */
export const isAuthenticatedLoaded = (state: AuthState) => state.authForm.loading;

/**
 * Return the users state
 * @function getAuthenticatedUser
 * @param {State} state
 * @returns {User}
 */
export const getAuthenticatedUser = (state: AuthState) => state.user;

/**
 * Returns true if request is in progress.
 * @function isLoading
 * @param {State} state
 * @returns {boolean}
 */
export const isLoading = (state: AuthState) => state.authForm.loading;

/**
 * Returns true if request is in done.
 * @function getAuthLoaded
 * @param {State} state
 * @returns {boolean}
 */
export const getAuthLoaded = (state: AuthState) => state.loaded;
