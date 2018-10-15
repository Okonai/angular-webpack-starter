import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';

import { DEV_REDUCERS, syncReducers, resetOnLogout, MainState, effects } from '@store/index';
import { RouterEffects } from '@store/effects/router.effect';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { CoreModule } from '@core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@modules/material';
import { ModalModule } from '@modules/popup/modal.module';
import { CurrencyFormatPipeModule } from '@core/pipes/currency.pipe';
import { CartModule } from './containers/cart/cart.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { UserEffects } from './user/user.effects';

export const metaReducers: MetaReducer<MainState>[] = ENV === 'development' ?
  [...DEV_REDUCERS, resetOnLogout] : [resetOnLogout];

export const APP_IMPORTS = [
  CommonModule,
  BrowserModule,
  NgbModule.forRoot(),
  HttpClientModule,
  RouterModule.forRoot(routes, { useHash: false }),
  CoreModule.forRoot(),
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  ModalModule,
  CurrencyFormatPipeModule,
  CartModule,
  // EffectsModule.forFeature(effects),
  EffectsModule.forRoot(effects),
  NgbModule.forRoot(),
  ReactiveFormsModule,
  StoreModule.forRoot(syncReducers, { metaReducers }),
  StoreRouterConnectingModule.forRoot({
    stateKey: 'router' // name of reducer key
  }),
  StoreDevtoolsModule.instrument({}),
  TransferHttpModule
];
