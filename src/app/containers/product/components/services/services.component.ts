import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from '@store/index';
import { Store } from '@ngrx/store';
import {  ProductServiceGroup } from '@models/product.model';


@Component({
  selector: 'app-product-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  @Input() productId: number;
  @Input() template: string;

  productServices$: Observable<ProductServiceGroup[]>;

  constructor(private store: Store<fromStore.MainState>) { }

  ngOnInit() {
    //this.productServices$ = this.store.select(fromStore.getProductServices);
  }
}
