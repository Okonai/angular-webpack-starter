import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import { Navigation } from '../../store/models/navigation.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  root$: Observable<Navigation[]>;
  menuOpened$: Observable<boolean>;
  breakpoint: String;

  constructor (
    private store: Store<fromStore.MainState>,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit () {
    this.root$ = this.store.select(fromStore.getNavigation);
    this.store.dispatch(new fromStore.LoadNavigation());
    this.menuOpened$ = this.store.select(fromStore.getShowMenu);

    this.store.select(fromStore.getActiveBreakpoint).subscribe((breakpoint: string) => {
      this.breakpoint = breakpoint;
    }).unsubscribe();
  }

  toggleMenu () {
    if (this.breakpoint === 'small') {
      this.store.dispatch(new fromStore.ToggleMainMenu());
    }
  }

  openMenu () {
    if (this.breakpoint !== 'small') {
      this.store.dispatch(new fromStore.OpenMainMenu());
    }
  }

  closeMenu () {
    if (this.breakpoint !== 'small') {
      this.store.dispatch(new fromStore.CloseMainMenu());
    }
  }

  openSubLevel (event) {
    let subpanel = event.target.parentElement.parentElement.childNodes[3];
    subpanel.classList.add('open');

  }

  closeSubLevel (event) {
    let subpanel = event.target.parentElement.parentElement.parentElement;
    subpanel.classList.remove('open');
  }
}
