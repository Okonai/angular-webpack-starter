
import {filter} from 'rxjs/operators';
import { Component, ChangeDetectionStrategy, Renderer2, HostListener, ViewEncapsulation } from '@angular/core';
import * as fromStore from '../store';
import { NavbarService } from '../services/navbar.service';
import { Store } from '@ngrx/store';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'layout.html',
  styleUrls: ['layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor (
    private store: Store<fromStore.MainState>,
    public nav: NavbarService,
    private router: Router,
    private renderer: Renderer2,
    private permission: NgxPermissionsService,
  ) { }
  ngOnInit () {

    let localToken = window.localStorage.getItem('access_token');
    let sessionToken = window.sessionStorage.getItem('access_token');
    let token = localToken != null ? localToken : sessionToken;

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationStart)) {
        return;
      }
      this.store.dispatch(new fromStore.CloseMainMenu());
      this.store.dispatch(new fromStore.RemoveAllFilter());
      // this.store.dispatch(new fromStore.FilterLoadProduct());
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        if (event['url'].indexOf('/auth') !== -1) {
          this.nav.hide();
        } else {
          this.nav.show();
        }
      });

    // this.nav.show();
    let site = 'SMARTSHOP';
    if (window['location'].host.indexOf('parts') !== -1) {
      site = 'SMARTPARTS';
    } else if (window['location'].host.indexOf('solution') !== -1) {
      site = 'SMARTSOLUTION';
    } else if (window['location'].host.indexOf('care') !== -1) {
      site = 'SMARTCARE';
    }
    this.permission.addPermission(site);

    this.store.dispatch(new fromStore.UpdateCurrentBreakpoint({ windowSize: window.innerWidth }));
    this.store.dispatch(new fromStore.UpdateStoreSite({ site: site }));

    if (token !== undefined && token !== null) {
      this.store.dispatch(new fromStore.SetAccessToken({ user: { access_token: token } }));
      this.store.dispatch(new fromStore.AuthLoadUser());
    }

    let hash = window['location'].hash.substr(1);

    let result = hash.split('&').reduce(function (resultSplit, item) {
      let parts = item.split('=');
      resultSplit[parts[0]] = parts[1];
      return resultSplit;
    }, {});

    Object.keys(result).forEach((a) => {
      if (a === 'code') {
        this.store.dispatch(new fromStore.AuthForgotAddCode({ forgot_form: { code: result[a] } }));
      }
    });

    this.store.select(fromStore.getStoreSite).subscribe((_site) => {
      this.renderer.addClass(document.body, _site.toLowerCase());
    });

  }

  @HostListener('window:resize', ['$event'])
  onResize (event) {
    this.store.dispatch(new fromStore.UpdateCurrentBreakpoint({ windowSize: event.target.innerWidth }));
  }
}
