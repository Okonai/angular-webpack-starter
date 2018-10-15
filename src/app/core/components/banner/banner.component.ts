import { Component, OnInit, SimpleChanges, Input, NgModule } from '@angular/core';
import { Store, State } from '@ngrx/store';
import * as fromStore from '../../../core/store/index'
import { Banner } from '../../store/models/banner.model';
import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  
  @Input() type: string;
  @Input() page: string; 

  banner$: Observable<Banner>;
  constructor(private store: Store<fromStore.MainState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadBannerAction({type: this.type, page: this.page}))
    this.banner$ = this.store.select(fromStore.getBanner)
  }

}


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    BannerComponent
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }
