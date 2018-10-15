import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as fromStore from '@store/index';
import { Store, State } from '@ngrx/store';
import { Product, ProductCard, ProductImage, ProductBreadcrumps, ProductAttribute } from '@models/product.model';

@Component({
  selector: 'app-breadcrumps',
  templateUrl: './breadcrumps.component.html',
  styleUrls: ['./breadcrumps.component.scss']
})
export class BreadcrumpsComponent implements OnInit {

  @Input() productCategoryId: number;

  productBreadcrumps$: Observable<ProductBreadcrumps[]>;

  constructor(private store: Store<fromStore.MainState>) { }
  /*
  ngOnChanges(changes: SimpleChanges) {
    if (changes.productCategoryId.currentValue != null) {
      this.store.dispatch(new fromStore.LoadProductBreadcrumpsAction({productCategoryId: changes.productCategoryId.currentValue}));
    }
  }
  */

  ngOnInit() {
    // this.productBreadcrumps$ = this.store.select(fromStore.getProductBreadcrumps);
    /**
     * Deprecated
     */
    // this.store.dispatch(new fromStore.LoadProductBreadcrumpsAction({productCategoryId: this.productCategoryId}));
  }

}
