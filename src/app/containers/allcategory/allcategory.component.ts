import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromStore from "../../core/store/";
import { Navigation } from '../../core/store/models/navigation.model';

@Component({
  selector: 'app-allcategory',
  templateUrl: './allcategory.component.html',
  styleUrls: ['./allcategory.component.scss']
})
export class AllcategoryComponent implements OnInit {

  root$: Observable<Navigation[]>;

  constructor(
    private store: Store<fromStore.MainState>,
  ) { }

  ngOnInit() {
    this.root$ = this.store.select(fromStore.getNavigation);
  }

}
