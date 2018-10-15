import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FrontpageComponent} from './frontpage.component';

import {NewsService} from '../../core/store/services';
import {FrontpageComponentsModule} from './components/frontpage.components';
import {FormsModule} from '@angular/forms';
import { MaterialModule } from '@modules/material';
import { CurrencyFormatPipeModule } from '../../core/pipes/currency.pipe';
import { NgxPermissionsModule } from 'ngx-permissions';

const COMPONENTS = [
  FrontpageComponent
];

@NgModule({
  imports: [
    CommonModule,
    FrontpageComponentsModule,
    MaterialModule,
      RouterModule.forChild([
      { path: '', component: FrontpageComponent }
    ]),
    CurrencyFormatPipeModule,
    NgxPermissionsModule.forChild()
  ],
  declarations: COMPONENTS,
  providers: []

})
export class FrontpageModule { }
