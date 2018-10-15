import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '@store/index';
import { Store, State } from '@ngrx/store';
import { Product, ProductAttribute } from '@models/product.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-highlighted-attributes',
  templateUrl: './highlightedattributes.component.html',
  styleUrls: ['./highlightedattributes.component.scss']
})
export class HighlightedattributesComponent implements OnInit {

  private _data = new BehaviorSubject<ProductAttribute[]>([]);

  @Input()
  set data(value) {
    if( value != null) this._data.next(value);
  };

  get data() {
      return this._data.getValue();
  }

  ngOnInit() {
    
  }
}
