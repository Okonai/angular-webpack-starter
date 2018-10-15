import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {Store} from "@ngrx/store";
import * as fromStore from "../../store";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private store: Store<fromStore.MainState>
  ) { }
  
  loggedIn$: Observable<boolean>;

  ngOnInit() {    
    this.loggedIn$ = this.store.select(fromStore.isAuthenticated);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
  }
}
