import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromStore from '@store/index';
import { Promotion } from '@models/promotion.model';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})

export class PromotionComponent implements OnInit {

  products$: Observable<any>;

  constructor(private store: Store<fromStore.MainState>) { }

  ngOnInit() {
    this.products$ = this.store.select(fromStore.selectFrontpagePromotionProducts);
    this.store.dispatch(new fromStore.LoadFrontpagePromotion());
  }
}
