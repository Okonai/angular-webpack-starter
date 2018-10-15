import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';


import { ProductImage } from '@models/product.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {

  private _data = new BehaviorSubject<ProductImage[]>([]);

  @Input()
  set data(value) {
      if (value != null) {
        this._data.next(value);
      }
  }

  get data() {
      return this._data.getValue();
  }

  constructor() { }

  ngOnInit() {

  }
}
