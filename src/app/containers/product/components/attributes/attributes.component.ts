import { Component, OnInit, Input } from '@angular/core';
import { ProductAttribute } from '@models/product.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {
  private _data = new BehaviorSubject([]);

  @Input()
  set data(value) {
    if( value != null) this._data.next(value);
  };

  get data() {
      const attributes = this._data.getValue();
      return Object.keys(attributes).map((key)=>{ return {categoryName:key, categoryItems:attributes[key]}});
  }

  ngOnInit() {
    
  }

  isURL(str) {
    let a = document.createElement('a');
    a.href = str;
    return (a.host && a.host !== window.location.host);
  }
}

