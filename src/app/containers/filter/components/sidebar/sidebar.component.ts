
import {debounceTime} from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from '@core/store/index';
import { Store } from '@ngrx/store';
import { Filter } from '@models/filter.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ResolvedUrl } from '@models/urlresolver.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

  @Input() filterForm: FormGroup;
  public priceRange;
  public open;
  filters$: Observable<Filter>;
  resolvedUrl: ResolvedUrl;

  constructor (
    private store: Store<fromStore.MainState>,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit () {
    this.resolvedUrl = this.activatedRoute.snapshot.data.resolvedUrl;
    this.filterForm.controls['category'].setValue(this.resolvedUrl.id);

    this.filters$ = this.store.select(fromStore.getFilters);
    this.onChanges();
  }

  onChanges () {
    this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe(filters => {
      this.store.dispatch(new fromStore.SetFiltersAction(filters));
    });
  }
}
