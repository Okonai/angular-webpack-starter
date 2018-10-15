import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {SliderComponent} from "./slider/slider.component";
import {ServicesComponent} from "./services/services.component";
import {TilesComponent} from "./tiles/tiles.component";
import {NewsComponent} from "./news/news.component";
import {PromotionComponent} from "./promotion/promotion.component";
import {MaterialModule} from "@modules/material/";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import 'hammerjs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CurrencyFormatPipeModule } from '../../../core/pipes/currency.pipe';
import { OrderByPipeModule } from '../../../core/pipes/orderby.pipe';
import { ProductPipeModule } from '../../../core/pipes/product.pipe';
import { ProductCardModule } from '@core/components/product-card/product-card.module';

export const COMPONENTS = [
    SliderComponent,
    ServicesComponent,
    TilesComponent,
    NewsComponent,
    PromotionComponent
];


@NgModule({
    imports: [
        MaterialModule,
        NgbModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CurrencyFormatPipeModule,
        OrderByPipeModule,
        ProductPipeModule,
        ProductCardModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class FrontpageComponentsModule {
}
