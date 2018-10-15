import { Component, OnInit, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from '@core/store/index';
import { Store } from '@ngrx/store';
import { loaderAnimation } from '@core/animations/loader.animation';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { ResolvedUrl } from '@core/store/models/urlresolver.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    loaderAnimation
  ]
})
export class FilterComponent implements OnInit {

  showFilter$: Observable<boolean>;
  resolvedId: number;
  opened: boolean = true;
  loadingFinished: Observable<boolean>;
  breakpoint$: Observable<String>;
  filterForm: FormGroup;

  constructor (
    private store: Store<fromStore.MainState>,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  ngOnInit () {
    this.filterForm = this.fb.group({
      category: [],
      attributes: [],
      page: [],
      sort: ['relevant']
    });
    const resolvedUrl: ResolvedUrl = this.activatedRoute.snapshot.data.resolvedUrl;
    this.breakpoint$ = this.store.select(fromStore.getActiveBreakpoint);
    this.resolvedId = resolvedUrl.id;

    // this.store.dispatch(new fromStore.SelectCategory(resolvedUrl.id));
    this.store.dispatch(new fromStore.LoadFilterAction(
      { category: resolvedUrl.id, promotion: resolvedUrl.controllerName === 'promotion' ? resolvedUrl.id : 0 }
    ));

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let tag: String = params['tag'];
      if (typeof tag !== 'undefined') {
        this.store.dispatch(new fromStore.FilterTagAdd(tag));
      }
    });
  }
}
