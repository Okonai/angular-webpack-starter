import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Header } from '../../../../core/store/models/filter.model';
import * as fromStore from "../../../../core/store/index";
import { Store } from '@ngrx/store';

import { ChangeDetectorRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent implements OnInit {

	header$: Observable<Header>;
	constructor(private store: Store<fromStore.MainState>) { }

	ngOnInit() {
		this.header$ = this.store.select(fromStore.getFilterHeader);
	}

}
