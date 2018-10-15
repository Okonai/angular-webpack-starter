import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAuth from '@reducers/auth.reducer';

export const getAuthState = createSelector(
    fromFeature.getStoreState,
    (state: fromFeature.MainState) => state.auth
  );

  /**
   * Returns The access_token for the current user
   * @function getAccessToken
   * @param {State} state
   * @param {any} props
   * @return {string(64)}
   */
  export const getAccessToken = createSelector(getAuthState, fromAuth.getAuth, (auth) => {
    return auth.user.access_token;
  });
  /**
   * Returns The access_token for the current user
   * @function getAccessToken
   * @param {State} state
   * @param {any} props
   * @return {string(64)}
   */
  export const saveAccessToken = createSelector(getAuthState, fromAuth.getAuth, (auth) => {
    return auth.authForm.save;
  });



  /**
   * Returns The pages array of products
   * @function getUser
   * @param {State} state
   * @param {any} props
   * @return {User}
   */
  export const getUser = createSelector(getAuthState, fromAuth.getAuth, (auth) => {
    return auth.user;
  });

  /**
   * Returns the status of the auth form
   * @function isLoadingAuth
   * @param {State} state
   * @param {any} props
   * @return {boolean}
   */
  export const isLoadingAuth = createSelector(getAuthState, fromAuth.getAuth, (auth) => {
    return auth.authForm.loading;
  });

  /**
   * Returns the status of the forgot password form
   * @function getUser
   * @param {State} state
   * @param {any} props
   * @return {boolean}
   */
  export const isLoadingForgot = createSelector(getAuthState, fromAuth.getAuth, (auth) => {
    return auth.forgotResponse.loading;
  });

  /**
   * Returns the page of the auth form
   * @function authGoTo
   * @param {State} state
   * @param {any} props
   * @return {string}
   */
  export const authGoTo = createSelector(getAuthState, fromAuth.getAuth, (auth) => {
    return auth.authForm.page;
  });

  /**
   * Returns the email of the auth form
   * @function authEmail
   * @param {State} state
   * @param {any} props
   * @return {string}
   */
  export const authEmail = createSelector(getAuthState, fromAuth.getAuth, (auth) => {
    return auth.authForm.email;
  });

  /**
   * Returns the popup of the auth form
   * @function authPopup
   * @param {State} state
   * @param {any} props
   * @return {string}
   */
  export const authPopup = createSelector(getAuthState, fromAuth.getAuth, (auth) => {
    return auth.popup;
  });

  /**
   * Returns the error status of the auth form
   * @function authLoginError
   * @param {State} state
   * @param {any} props
   * @return {boolean}
   */
  export const authLoginError = createSelector(getAuthState, fromAuth.getAuth, (auth) => {
    return auth.authForm.error;
  });

  /**
   * Returns the error status of the auth form
   * @function authLoginError
   * @param {State} state
   * @param {any} props
   * @return {boolean}
   */
  export const authForgotCodeError = createSelector(getAuthState, fromAuth.getAuth, (auth) => {
    return auth.forgotResponse.status;
  });
  /**
   * Returns the error status of the auth form
   * @function authLoginError
   * @param {State} state
   * @param {any} props
   * @return {boolean}
   */
  export const hashCode = createSelector(getAuthState, fromAuth.getAuth, (auth) => {
    return auth.forgotForm.code;
  });

  /**
   * Returns the authentication status
   * @function isAuthenticated
   * @param {State} state
   * @param {any} props
   * @return {boolean}
   */
  export const isAuthenticated = createSelector(getAuthState, fromAuth.getAuth, (auth) => {
    return auth.user.access_token != null;
  });


  /**
   * Returns the Authenticated User data
   * @function getAuthenticatedUser
   * @param {State} state
   * @param {any} props
   * @return {User}
   */
  export const getAuthenticatedUser = createSelector(getAuthState, fromAuth.getAuthenticatedUser);

  /**
   * Returns the Authenticated User data
   * @function getAuthenticatedUser
   * @param {State} state
   * @param {any} props
   * @return {User}
   */
  export const getAuthLoaded = createSelector(getAuthState, fromAuth.getAuthLoaded);


