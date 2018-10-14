import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';


export const APP_IMPORTS = [
  EffectsModule.forRoot([

  ]),
  NgbModule.forRoot(),
  ReactiveFormsModule,
  StoreModule.forRoot({}, {}),
  /*StoreRouterConnectingModule.forRoot({
    stateKey: 'router' // name of reducer key
  }),*/
  TransferHttpModule
];
