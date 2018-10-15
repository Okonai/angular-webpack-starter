
import {take, skip,  last } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as fromStore from '../../../core/store/index';
import { Store } from '@ngrx/store';
import { FilterModule } from '../../../containers/filter/filter.module';
import { ProductModule } from '../../../containers/product/product.module';
import { StaticModule } from '../../../containers/static/static.module';
import { SiteGuard } from '../site/site.guard';

@Injectable()
export class UrlGuard implements CanActivate {

  constructor (
    private store: Store<fromStore.MainState>,
    private router: Router,
  ) { }

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const slug = next.params.slug.toString().replace(/\-([csarp])([0-9]+)$/i, '');
    this.store.dispatch(new fromStore.ResolveUrlAction({slug: slug}));

    return new Promise<boolean>(resolve => {
      this.store.select(fromStore.getResolvedUrl).pipe(
      skip(1),take(1),)
      .subscribe(resolvedUrl => {
        // console.log(resolvedUrl);
        // console.log(this.router.config)

        switch (resolvedUrl.controllerName) {
          case 'promotion':
          case 'category': {
            let config = [
              {
                path: next.params.slug,
                loadChildren: () => FilterModule,
                canLoad: [SiteGuard],
                data: {
                  resolvedUrl,
                  siteGuardConfig: {
                    sites: {
                      'SMARTSOLUTION': true,
                      'SMARTSHOP': true,
                      'SMARTPARTS': false,
                    },
                    redirectTo: '/auth'
                  }
                }
              },
              ...this.router.config
            ];
            this.router.resetConfig(config);
            this.router.navigate([next.params.slug], {
                replaceUrl: false
            });
            resolve(false);
            break;

          }

          case 'product': {
            let config = [
              {
                path: next.params.slug,
                loadChildren: () => ProductModule,
                canLoad: [SiteGuard],
                data: {
                  resolvedUrl,
                  siteGuardConfig: {
                    sites: {
                      'SMARTSOLUTION': true,
                      'SMARTSHOP': true,
                      'SMARTPARTS': false,
                    },
                    redirectTo: '/auth'
                  }
                }
              },
              ...this.router.config
            ];
            this.router.resetConfig(config);
            this.router.navigate([next.params.slug], {
                replaceUrl: false
            });
            resolve(false);
            break;
          }

          case 'content': {
            let config = [
              {
                path: next.params.slug,
                loadChildren: () => StaticModule,
                canLoad: [SiteGuard],
                data: {
                  resolvedUrl,
                  siteGuardConfig: {
                    sites: {
                      'SMARTSOLUTION': true,
                      'SMARTSHOP': true,
                      'SMARTPARTS': false,
                    },
                    redirectTo: '/auth'
                  }
                }
              },
              ...this.router.config
            ];
            this.router.resetConfig(config);
            this.router.navigate([next.params.slug], {
                replaceUrl: false
            });
            resolve(false);
            break;
          }

          default: {
            this.router.navigate(['404'], {
              replaceUrl: false
            });
            resolve(false);
            break;
          }
        }
      });
    });
  }
}
