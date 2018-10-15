import { Component, OnInit, ViewEncapsulation, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { TransferState } from '../modules/transfer-state/transfer-state';
import { NavbarService } from '@core/services/navbar.service';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import * as fromStore from '@store/index';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  styleUrls: ['main.scss', './app.component.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor (
    private cache: TransferState,
    public route: ActivatedRoute,
    public router: Router,
    private store: Store<fromStore.MainState>,
    public nav: NavbarService,
    private renderer: Renderer2,
    private permission: NgxPermissionsService,
  ) { }

  ngOnInit () {
    this.cache.set('cached', true);

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

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart)
      )
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

  activateEvent (event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent (event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }
}
