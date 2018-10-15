import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromStore from "../../store";
import { Store } from '@ngrx/store';

@Injectable()
export class SiteGuard implements CanLoad {

  constructor(
    private store: Store<fromStore.MainState>,
    private router: Router,
    private route: ActivatedRoute
  ){}


  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {

    let siteguardConfig = route.data.siteGuardConfig;


    let isAuthenticated:Observable<boolean> = this.store.select(fromStore.isAuthenticated);
    let storeSite:Observable<string> = this.store.select(fromStore.getStoreSite);
    
    return new Promise<boolean>(resolve => {
      Observable.combineLatest(
        isAuthenticated,
        storeSite
      ).subscribe(
        ([isAuthenticated, storeSite ] ): void => {
          let canLoad = siteguardConfig.sites[storeSite];
          if( canLoad || isAuthenticated ) {
            resolve(true);
          } else {
            this.router.navigate([siteguardConfig.redirectTo], {
              replaceUrl: false
            })
            resolve(false);
          }
        }
      )
    });
  }
}
