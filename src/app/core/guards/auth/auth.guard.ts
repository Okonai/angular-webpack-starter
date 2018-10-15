import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as fromStore from "../../store";
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(
    private store: Store<fromStore.MainState>,
    private router: Router
  ){}


  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {

    let canLoad:boolean = route.data.authGuardConfig.authenticatedCanLoad;
    let redirectTo:string = route.data.authGuardConfig.redirectTo;

    return this.store.select(fromStore.isAuthenticated)
    .map(isAuthenticated => {
      if(isAuthenticated && canLoad) {
        return true
      } else {
        this.router.navigateByUrl(redirectTo);
      }
    })
    .take(1);
  }
  
}
