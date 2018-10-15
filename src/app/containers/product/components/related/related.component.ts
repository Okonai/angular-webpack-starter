import { Component, OnInit, NgModule, Input, SimpleChanges } from '@angular/core';
import * as fromStore from '@store/index'
import { Store, State } from '@ngrx/store';
import { Product } from '@models/product.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss']
})
export class RelatedComponent implements OnInit {
 
  @Input() viewClass: string;
  private _data = new BehaviorSubject<Product[]>([]);

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