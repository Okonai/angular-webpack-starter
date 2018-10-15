import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartComponent } from './add-to-cart.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyFormatPipeModule } from '@core/pipes/currency.pipe';
import { MaterialModule } from '@modules/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CurrencyFormatPipeModule,
    MaterialModule,
  ],
  declarations: [
    AddToCartComponent
  ],
  exports: [
    AddToCartComponent
  ]
})
export class AddToCartModule { }
