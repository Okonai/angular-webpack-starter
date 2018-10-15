import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';

import { DEV_REDUCERS, syncReducers, resetOnLogout, AppState } from '@reducers/index';
import { RouterEffects } from '@store/effects/router.effect';
// import { UserEffects } from './user/user.effects';

export const metaReducers: MetaReducer<AppState>[] = ENV === 'development' ?
  [...DEV_REDUCERS, resetOnLogout] : [resetOnLogout];

export const APP_IMPORTS = [
  EffectsModule.forRoot([
    RouterEffects,
    // UserEffects
  ]),
  NgbModule.forRoot(),
  ReactiveFormsModule,
  StoreModule.forRoot(syncReducers, { metaReducers }),
  StoreRouterConnectingModule.forRoot({
    stateKey: 'router' // name of reducer key
  }),
  TransferHttpModule
];
