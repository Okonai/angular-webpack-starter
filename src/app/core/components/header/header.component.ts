import {Component, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromStore from '../../store';
import {User} from '../../store/models/auth.model';

import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  siteImage$: Observable<string>;
  user$: Observable<User>;

  showCart: boolean = false;

  constructor (
    private store: Store<fromStore.MainState>
  ) {

  }

  ngOnInit () {
    this.loggedIn$ = this.store.select(fromStore.isAuthenticated);
    this.store.dispatch(new fromStore.AuthLoadUser());
    this.user$ = this.store.select(fromStore.getAuthenticatedUser);
  }

  toggleCart () {
    this.showCart = !this.showCart;
  }
}
