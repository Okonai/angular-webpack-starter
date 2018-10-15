import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@models/product.model';
import { Store } from '@ngrx/store';
import * as fromStore from '@core/store/index';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(
    private store: Store<fromStore.MainState>
  ) { 
  }


  ngOnInit() {
    this.products$ = this.store.select(fromStore.getCartProductEntities);
  }

}
