import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { RouterModule } from '@angular/router';
import { OrderByPipeModule } from '@core/pipes/orderby.pipe';
import { ProductPipeModule } from '@core/pipes/product.pipe';
import { MaterialModule } from '@modules/material';
import { AddToCartModule } from '@core/components/add-to-cart/add-to-cart.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OrderByPipeModule,
    ProductPipeModule,
    MaterialModule,
    AddToCartModule
  ],
  declarations: [ProductCardComponent],
  exports: [ProductCardComponent]
})
export class ProductCardModule { }
