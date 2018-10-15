import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialModule} from '@modules/material/';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import 'hammerjs';
import { CommentsComponent } from './comments/comments.component';
import { QuestionsComponent } from './questions/questions.component';
import { ServicesComponent } from './services/services.component';
import { SliderComponent } from './slider/slider.component';
import { AttributesComponent } from './attributes/attributes.component';
import { HighlightedattributesComponent } from './highlightedattributes/highlightedattributes.component';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BreadcrumpsModule } from '../../../core/components/breadcrumps/breadcrumps.module';
import { ProductCardModule } from '@core/components/product-card/product-card.module';
import { RelatedComponent } from './related/related.component';

export const COMPONENTS = [
  CommentsComponent,
  QuestionsComponent,
  ServicesComponent,
  SliderComponent,
  AttributesComponent,
  HighlightedattributesComponent,
  DetailsComponent,
  RelatedComponent,
];


@NgModule({
  imports: [
    MaterialModule,
    NgbModule,
    CommonModule,
    RouterModule,
    FormsModule,
    BreadcrumpsModule,
    ProductCardModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})

export class ProductComponentsModule { }
