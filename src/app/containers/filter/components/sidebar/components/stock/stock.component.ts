import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Tags } from '../../../../../../core/store/models/filter.model';
import * as fromStore from "../../../../../../core/store/index";
import { Store } from '@ngrx/store';
import { FormGroup, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {

	@Input() stock: any;
	@Input() parentForm: FormGroup;
	stockFormArray: FormArray = new FormArray([]);

	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		const stock = changes.stock.currentValue;
		
		if (stock !== null) {
			if (typeof stock === 'object' && Object.keys(stock).length !== 0) {
				const controls = stock.map(c => new FormControl(false));
				this.stockFormArray =  new FormArray(controls);
				this.parentForm.addControl('stock', this.stockFormArray);
			}
		}
	}

	get stockForm () {
		return this.stockFormArray;
	}
}
