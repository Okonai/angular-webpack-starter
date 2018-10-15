import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromStore from "../../../../core/store/index";
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthWrapperComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.MainState>,
    private _location: Location
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromStore.isLoadingAuth);
  }

  back() {
      this._location.back();
  }
}
