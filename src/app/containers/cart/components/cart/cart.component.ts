import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@models/product.model';
import { Store } from '@ngrx/store';
import * as fromStore from '@core/store/index';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges {

  @Input() view: string = 'full';
  products$: Observable<Product[]>;
  viewClass: string = 'cart-full';

  constructor (
    private store: Store<fromStore.MainState>
  ) {
    console.log(this.view);
  }

  ngOnChanges (changes) {
    if ( changes.view.currentValue === 'sidebar') {
      this.viewClass = 'cart-sidebar';
    }
  }

  ngOnInit () {
    this.products$ = this.store.select(fromStore.getCartProductEntities);
  }

}
