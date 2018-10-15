import { } from '@models/filter.model';
import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import {  } from '@models/filter.model';
import { ProductCard, ProductVariable, Product, ProductDetail } from '@models/product.model';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: [
    './scss/base.scss',
    './scss/box.scss',
    './scss/cart.scss',
    './scss/compact.scss',
    './scss/list.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  @Input() viewClass: String;
  card: ProductCard;
  variable: ProductVariable;
  details: ProductDetail;


  constructor() { }

  ngOnInit() {
    this.card = this.product.card;
    this.variable = this.product.variable;
    this.details = this.product.details;
  }

}
