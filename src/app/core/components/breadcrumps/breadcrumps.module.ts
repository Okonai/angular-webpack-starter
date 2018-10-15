import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumpsComponent } from './breadcrumps.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    BreadcrumpsComponent
  ],
  exports: [
    BreadcrumpsComponent
  ]
})
export class BreadcrumpsModule { }
