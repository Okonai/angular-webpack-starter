import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SubscribeForm} from '@models/newsletter.model';
import {ApiResponse} from '@models/apiresponse.model';
import { ApplicationHttpClient } from '@core/services/http.service';
import { API_PATH } from '@core/constants';

export const MOCK_NEWSLETTER = new SubscribeForm();

MOCK_NEWSLETTER.name = 'Foo';
MOCK_NEWSLETTER.email = 'foo@test.com';


/**
 * The user service.
 */
@Injectable()
export class NewsletterService {

    /**
     * True if authenticated
     * @type
     */
    private _subscribed = false;

    constructor(private http: ApplicationHttpClient) {
    }

    /**
     * Subscribe to newsletter
     *
     * @param {string} name The user's email address
     * @param {string} email The user's name
     * @returns {Observable<APINewsletterResponse>}
     */
    public subscribe(subscribeForm: SubscribeForm): Observable<ApiResponse> {

        return this.http.Post<ApiResponse>(
            API_PATH.base + 'newsletter-subscribe',
            {
                'SubscribeForm': subscribeForm
            });


    }


}
