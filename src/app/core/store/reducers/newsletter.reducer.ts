// import models

import { NewsletterActions, newsletterActionTypes } from '../actions';
import { SwalModal } from '../models/modal.model';
import { SubscribeErrorActionPayload } from '../models/newsletter.model';


/**
 * The state.
 * @interface State
 */
export interface NewsletterState {

    // boolean if user is subscribed
    subscribed: boolean;

    // error message
    error?: any;

    // true if we have attempted existing auth session
    loaded: boolean;

    // true when loading
    loading: boolean;

    modal: SwalModal;
}

/**
 * The initial state.
 */
const initialState: NewsletterState = {
    subscribed: null,
    loaded: false,
    loading: false,
    modal: null
};

/**
 * The reducer function.
 * @function reducer
 * @param {State} state Current state
 * @param {Actions} action Incoming action
 */
export function reducer(state: any = initialState, action: NewsletterActions): NewsletterState {

    switch (action.type) {
        case newsletterActionTypes.SUBSCRIBE:
            return Object.assign({}, state, {
                error: undefined,
                loading: true
            });

        case newsletterActionTypes.SUBSCRIBE_ERROR:
            let payloadSubscribeError: SubscribeErrorActionPayload = action.payload;

            let modalSubscribeError: SwalModal = {
                title: 'Hiba',
                text: payloadSubscribeError.errorMessage,
                type: 'error'
            };
            return Object.assign({}, state, {
                subscribed: false,
                error: payloadSubscribeError.error,
                loaded: true,
                modal: modalSubscribeError
            });

        case newsletterActionTypes.SUBSCRIBE_SUCCESS:
            let modalSubscribeSuccess: SwalModal = {
                text: 'Köszönjük a felíratkozást.',
                type: 'success'
            };

            return Object.assign({}, state, {
                loaded: true,
                subscribed: true,
                modal: modalSubscribeSuccess
            });


        default:
            return state;
    }
}

/**
 * Returns true if successfully subscribed to newsletter.
 * @function isAuthenticated
 * @param {State} state
 * @returns {boolean}
 */
export const isSubscribed = (state: NewsletterState) => state.subscribed;


/**
 * Returns true if request is in progress.
 * @function isLoading
 * @param {State} state
 * @returns {boolean}
 */
export const isLoading = (state: NewsletterState) => state.loading;

/**
 * Returns the subscribe newsletter error.
 * @function getSignOutError
 * @param {State} state
 * @returns {Error}
 */
export const getSubscribeError = (state: NewsletterState) => state.error;

/**
 * Returns the subscribe modal state
 * @param {NewsletterState} state
 * @returns {any}
 */
export const getSubscribeModal = (state: NewsletterState) => state.modal;

