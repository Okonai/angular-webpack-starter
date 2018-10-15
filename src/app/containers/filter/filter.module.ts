import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterComponent } from "./filter.component";
import { MainComponent } from "./components/main/main.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

import { CategoryComponent } from "./components/sidebar/components/category/category.component";
import { ManufacturerComponent } from "./components/sidebar/components/manufacturer/manufacturer.component";
import { PriceComponent } from "./components/sidebar/components/price/price.component";
import { TagsComponent } from "./components/sidebar/components/tags/tags.component";
import { StockComponent } from "./components/sidebar/components/stock/stock.component";

import { BannerComponent } from './components/main/components/banner/banner.component';
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';

import { MaterialModule } from '@modules/material';
import { BreadcrumpsModule } from '../../core/components/breadcrumps/breadcrumps.module';
import { OrderByPipeModule } from '../../core/pipes/orderby.pipe';

import { NouisliderModule } from 'ng2-nouislider';
import { ProductCardModule } from '@core/components/product-card/product-card.module';

import {NgxPaginationModule} from 'ngx-pagination';

const COMPONENTS = [
  FilterComponent,
  MainComponent,
  SidebarComponent,
  BannerComponent,
  CustomHeaderComponent,
  BannerComponent,
  CategoryComponent,
  ManufacturerComponent,
  PriceComponent,
  TagsComponent,
  StockComponent,
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,    
    ReactiveFormsModule,
    MaterialModule,
    BreadcrumpsModule,
    RouterModule,
    OrderByPipeModule,
    ProductCardModule,
    NgxPaginationModule,
    RouterModule.forChild([
      { path: '', component: FilterComponent}
    ]),
    NouisliderModule,
  ],
  declarations: COMPONENTS,
  exports: [
    FilterComponent
  ]
})
export class FilterModule { }
