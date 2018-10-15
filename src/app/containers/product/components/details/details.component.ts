import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ProductDetail } from '@models/product.model';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-product-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  
  private _data = new BehaviorSubject<ProductDetail[]>([]);

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
