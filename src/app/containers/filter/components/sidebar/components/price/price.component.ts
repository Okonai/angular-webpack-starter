import { Component, OnInit, ViewEncapsulation, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Price } from '../../../../../../core/store/models/filter.model';
import { Observable } from 'rxjs';
import * as fromStore from '../../../../../../core/store/index';
import { Store } from '@ngrx/store';
import wNumb from 'wnumb';
import { FormGroup, FormArray, FormControl } from '@angular/forms';



@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PriceComponent {

  @Input() prices: Price[];
  @Input() parentForm: FormGroup;
  priceForm: FormControl;

  public priceRange = [5, 100000];
  public pricesLoaded = false;

  priceRangeConfig = {
    behaviour: 'drag',
    connect: true,
    range: {
      min: 0,
      max: 100
    },
    margin: 3000,
    step: 1000,
    tooltips: true,
    format: wNumb({
        decimals: 0,
        thousand: ' ',
    })
  };
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const prices = changes.prices.currentValue;
    
    if (prices !== null) {
      if (typeof prices === 'object' && Object.keys(prices).length !== 0) {
        this.priceRangeConfig.range.min = parseInt(prices['min'].value);
        this.priceRangeConfig.range.max = parseInt(prices['max'].value); 
        this.priceForm = new FormControl(
          [
            this.priceRangeConfig.range.min,
            this.priceRangeConfig.range.max
          ]      
        )
        this.parentForm.addControl(
          'price', this.priceForm
        )
        this.pricesLoaded = true;
      }
    }
  }
}
