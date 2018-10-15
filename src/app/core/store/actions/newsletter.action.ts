import {Action} from '@ngrx/store';
import {
    SubscribeErrorActionPayload,
    SubscribePayload
} from '../models/newsletter.model';


export const newsletterActionTypes = {
    SUBSCRIBE: '[Newsletter] Subscribe',
    SUBSCRIBE_ERROR: '[Newsletter] Subscribe error',
    SUBSCRIBE_SUCCESS: '[Newsletter] Subscribe success',
};

/**
 * Newsletter subscribe.
 * @class NewsletterAction
 * @implements {Action}
 */

export class SubscribeAction implements Action {
    public type: string = newsletterActionTypes.SUBSCRIBE;

    constructor(public payload: SubscribePayload) {

    }
}

export class SubscribeSuccessAction implements Action {
    public type: string = newsletterActionTypes.SUBSCRIBE_SUCCESS;
    constructor(public payload: any) {}
}


export class SubscribeErrorAction implements Action {
    public type: string = newsletterActionTypes.SUBSCRIBE_ERROR;

    constructor(public payload: SubscribeErrorActionPayload) {

    }
}



/**
 * Actions type.
 * @type {Actions}
 */
export type NewsletterActions
    =
    SubscribeAction
    | SubscribeSuccessAction
    | SubscribeErrorAction
    ;
