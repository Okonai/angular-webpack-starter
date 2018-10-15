import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { StaticComponent } from './static.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@modules/material';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../core/store/reducers/static.reducer';
import { StaticService } from '../../core/store/services';

const COMPONENTS = [
  StaticComponent
];

@NgModule({
  imports: [    
    CommonModule,  
    MaterialModule,
    FormsModule, 
    StoreModule.forFeature('static', reducer),
    RouterModule.forChild([
      { path: '', component: StaticComponent}
    ]),
  ],
  declarations: COMPONENTS,
  providers: [],
  exports: COMPONENTS

})
export class StaticModule { }