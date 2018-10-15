export class SubscribeForm {
    name: string;
    email: string;
    g: number;
}

export class SubscribePayload {
    formControlManager: any;
    subscribeForm: SubscribeForm;

}
export class SubscribeErrorActionPayload {
    error: { [p: string]: string[] };
    errorMessage: string;
}
