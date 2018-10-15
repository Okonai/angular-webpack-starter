import { Component, OnInit, ViewEncapsulation, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';
import { Manufacturer } from '../../../../../../core/store/models/filter.model';
import * as fromStore from "../../../../../../core/store/index";
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';


@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManufacturerComponent {

	@Input() manufacturers: Manufacturer[];	
	@Input() parentForm: FormGroup;
	manufacturersFormArray: FormArray = new FormArray([]);

	constructor(
		private fb: FormBuilder
	) { }

	ngOnChanges(changes: SimpleChanges) {
		const manufacturers = changes.manufacturers.currentValue;
		
		if (manufacturers !== null) {
			if (typeof manufacturers === 'object' && Object.keys(manufacturers).length !== 0) {
				const controls = manufacturers.map(c => new FormControl(false));
				this.manufacturersFormArray =  new FormArray(controls);
				this.parentForm.addControl('manufacturers', this.manufacturersFormArray);
			}
		}
	}

	get manufacturersForm () {
		//console.log(this.manufacturersFormArray);
		return this.manufacturersFormArray;
	}
}
