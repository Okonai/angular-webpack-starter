import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@models/product.model';
import * as fromStore from '@core/store/index';
import { Store } from '@ngrx/store';

import { ChangeDetectorRef } from '@angular/core';

import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { loaderAnimation } from '@core/animations/loader.animation';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [
		loaderAnimation,
		trigger('products', [
			transition('* => *', [

				query(':enter', style({ opacity: 0 }), { optional: true }),

				query(':enter', stagger('50ms', [
					animate('.6s ease-in', keyframes([
						style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
						style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
						style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
					]))]), { optional: true })
			])
		])
	]
})
export class MainComponent implements OnInit {

	@Input() filterForm: FormGroup; 

	pager$: Observable<{
		totalCount: number, 
		page: number
	}>;
	products$: Observable<Product[]>;
	
	sort$: Observable<String>;
	loading$: Observable<boolean>;
	showFilter$: Observable<boolean>;

	viewClass: string = 'compact';
	sortType: string = 'relevant';
	page: number;

	constructor(
		private store: Store<fromStore.MainState>
	) { }

	ngOnInit() {
		this.products$ = this.store.select(fromStore.getFilterProducts);
		this.showFilter$ = this.store.select(fromStore.getShowFilter);
		this.loading$ = this.store.select(fromStore.getProductsloading);
		this.pager$ = this.store.select(fromStore.getFilterPager);

		//this.sort$ = this.store.select(fromStore.getSort);
	}

	selectSortType(event: any) {
		this.store.dispatch(new fromStore.FilterSetSort(event));
	}

	paginationEvent(event) {
		this.filterForm.controls['page'].setValue(event);
		//this.store.dispatch(new fromStore.SetFiltersAction({page: event}));
	}

	get sort() {
		return this.filterForm.controls['sort'];
	}
}
