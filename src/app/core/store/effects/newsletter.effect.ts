
import {of as observableOf, Observable} from 'rxjs';

import {catchError, map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

// import @ngrx
import { Effect, Actions } from '@ngrx/effects';
import {Action} from '@ngrx/store';






// import services
import {UserService} from '../services/user.service';

import * as newsletterActions from '../actions/newsletter.action';
import {NewsletterService} from '../services/newsletter.service';
import {
    SubscribeErrorActionPayload,
    SubscribePayload
} from '../models/newsletter.model';
import * as fromStore from '../index';

import {ApiResponse} from '@models/apiresponse.model';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class NewsletterEffect {

    /**
     * Authenticate user.
     * @method authenticate
     */
    @Effect()
    public subscribe: Observable<Action> = this.actions
        .ofType(newsletterActions.newsletterActionTypes.SUBSCRIBE).pipe(
        map((action: newsletterActions.NewsletterActions) => action.payload),
        switchMap((payload: SubscribePayload) => {

            let isValid = payload.formControlManager.IsValid();
            if (isValid) {
                return this.newsletterService.subscribe(payload.subscribeForm).pipe(
                    map((newsletter) => {

                        return new newsletterActions.SubscribeSuccessAction(payload);
                    }),
                    catchError(
                        (httpErrorResponse: HttpErrorResponse) => {
                            let errorMessageServerSide = payload.formControlManager.GetErrorForMessage(httpErrorResponse);

                            return observableOf(new newsletterActions.SubscribeErrorAction({
                                error: httpErrorResponse.error,
                                errorMessage: errorMessageServerSide
                            }));
                        }
                    ),);
            } else {
                let clientSideErrors = payload.formControlManager.GetAllClientAndServerSideErrorsForState();

                // payload.formControlManager.formValidationErrorSweetAlert(payload.formControlManager.GetErrorForMessage());
                let errorMessageClientSide = payload.formControlManager.GetErrorForMessage();

                // belerakom a statebe a kliensoldali hibákat is
                return observableOf(new newsletterActions.SubscribeErrorAction(<SubscribeErrorActionPayload>{
                    error: clientSideErrors ? clientSideErrors.error : {},
                    errorMessage: errorMessageClientSide
                }));
            }

        }),);

    /**
     * @constructor
     * @param {Actions }actions
     * @param {UserService} userService
     */
    constructor(private actions: Actions,
                private newsletterService: NewsletterService) {
    }
}
