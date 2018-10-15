
import {merge as observableMerge, Observable} from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as fromStore from '../../../../core/store';
import {Store} from '@ngrx/store';
import {Order} from '../../../../core/store/models/user.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class OrdersComponent implements OnInit {

    orders$: Observable<Order>;
    loading$: Observable<boolean>;
    orderIds$: Observable<Number[]>;
    dates$: Observable<Date[]>;
    statuses$: Observable<String[]>;
    
    selectedOrderId: number = null;
    startDate: Date;
    maxDate: Date;
    minDate: Date;
    filterDates: Date[] = [];
    page: number = 1;
    filterForm: FormGroup;


    constructor(      
      private fb: FormBuilder,
      private store: Store<fromStore.MainState>
    ) {
      this.filterForm = this.fb.group({
        date: ({ value: null, disabled: true}),
        order_number: [null],
        status: [null]
      });

      this.loading$ = this.store.select(fromStore.getUserLoading);
      this.orders$ = this.store.select(fromStore.getFilteredUserOrders);      
      this.orderIds$ = this.store.select(fromStore.getOrdersOrderNumbers);      
      this.statuses$ = this.store.select(fromStore.getOrdersStatuses);
      this.dates$ = this.store.select(fromStore.getOrdersDates);
      this.dates$.subscribe(dates => {        
        if(dates.length > 0) this.filterForm.controls['date'].enable();

        this.filterDates = dates;

        this.filterForm.controls['date'].setValue(null, {emitEvent: false});
        this.startDate = new Date(_.maxBy(dates, function(o) { return o.getTime(); }));
        this.maxDate = new Date(_.maxBy(dates, function(o) { return o.getTime(); }));
        this.minDate = new Date(_.minBy(dates, function(o) { return o.getTime(); }));
      })

      this.filterForm.get('order_number').valueChanges.subscribe(() => {
        this.filterForm.controls['date'].setValue(null, {emitEvent: false});
        this.filterForm.controls['status'].setValue(null, {emitEvent: false})
        this.store.dispatch(new fromStore.SetOrderFiltersAction(this.filterForm.value));
      });

      observableMerge(
        this.filterForm.get('date').valueChanges, 
        this.filterForm.get('status').valueChanges
      ).subscribe((date) => {
        this.startDate = date;
        this.filterForm.controls['order_number'].setValue(null, {emitEvent: false});
        this.store.dispatch(new fromStore.SetOrderFiltersAction(this.filterForm.value));
      })
    }

    ngOnInit() {
      this.store.dispatch(new fromStore.LoadUserOrdersAction());
    }

    panelOpened(id) {
      this.selectedOrderId = id;
      this.store.dispatch(new fromStore.LoadUserOrderAction({id: id}));
    }

    trackByFn(index, item) {
      return index; // or item.id
    }

    paginationEvent(event) {
      this.selectedOrderId = null;
      this.page = event
    }

    dateFilter = (d: Date) => {     
      return _.find(this.filterDates, function(date) {
        let d1 = new Date(date);
        let d2 = new Date(d);
        return (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate());
      });
    }

    testStream(event) {
      console.log(event);
    }

    get date() {
      return this.filterForm.get('date');
    }

    get order_number() {
      return this.filterForm.get('order_number');
    }

    get status() {
      return this.filterForm.get('status');
    }

    sameDay(d1, d2) {
        return d1.getYear() === d2.getYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }
}
