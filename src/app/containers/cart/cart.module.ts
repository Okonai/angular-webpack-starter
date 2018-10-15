import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { ProductCardModule } from '@core/components/product-card/product-card.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CurrencyFormatPipeModule } from '@core/pipes/currency.pipe';
import { CartContainerComponent } from './cart-container.component';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MaterialModule } from '@modules/material';
import { SummaryComponent } from './components/summary/summary.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProductCardModule,
    PerfectScrollbarModule,
    CurrencyFormatPipeModule,
    MaterialModule,
  ],
  declarations: [CartComponent, CartContainerComponent, CheckoutComponent, SummaryComponent],
  exports: [
    CartComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class CartModule { }

@NgModule({
  imports: [
    CommonModule,
    CartModule,
    RouterModule.forChild([
      {
          path: '', component: CartContainerComponent, children: [
              {path: '', redirectTo: 'termeklista'},
              {path: 'termeklista', component: CartComponent},
              {path: 'penztar', component: CheckoutComponent},
              {path: 'osszesito', component: SummaryComponent},
          ]
      }
    ]),
  ]
})
export class CartContainerModule {}
