import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponentsModule } from './components/product.components';
import { MaterialModule } from '@modules/material';
import { BreadcrumpsModule } from '@core/components/breadcrumps/breadcrumps.module';
import { CurrencyFormatPipeModule } from '@core/pipes/currency.pipe';
import { BannerModule } from '../../core/components/banner/banner.component';

const COMPONENTS = [
  ProductComponent
];

@NgModule({
  imports: [
    CommonModule,
    ProductComponentsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: ProductComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
    BreadcrumpsModule,
    CurrencyFormatPipeModule,
    BannerModule,
  ],
  declarations: COMPONENTS,
  providers: []

})
export class ProductModule { }
