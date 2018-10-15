/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { SeoResolver } from '@core/resolvers/seo.resolver';
import { AuthGuard } from '@core/guards/auth/auth.guard';
import { NotFoundPageComponent } from '@core/containers/not-found-page/not-found-page.component';
import { AllcategoryComponent } from './containers/allcategory/allcategory.component';
import { UrlGuard } from '@core/guards/url/url.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './containers/frontpage/frontpage.module#FrontpageModule',
  },
  {
    path: 'profil',
    loadChildren: './containers/profile/profile.module#ProfileModule',
    canLoad: [AuthGuard],
    data: {
      authGuardConfig: {
        authenticatedCanLoad: true,
        redirectTo: '/auth'
      }
    }
  },
  {
    path: 'auth',
    loadChildren: './containers/authentication/authentication.module#AuthenticationModule',
  },
  {
    path: 'product',
    loadChildren: './containers/product/product.module#ProductModule',
    resolve: {
      seo: SeoResolver,
    }
  },
  {
    path: 'category',
    loadChildren: './containers/filter/filter.module#FilterModule',
    resolve: {
      seo: SeoResolver,
    }
  },
  {
    path: 'static',
    loadChildren: './containers/static/static.module#StaticModule',
    resolve: {
      seo: SeoResolver,
    },
  },
  {
    path: '404',
    component: NotFoundPageComponent,
    resolve: {
      seo: SeoResolver,
    },
  },
  {
    path: 'minden-kategoria',
    component: AllcategoryComponent,
    resolve: {
      seo: SeoResolver,
    },
  },
  {
    path: 'kosar',
    loadChildren: './containers/cart/cart.module#CartContainerModule',
  },
  {
    path: 'autentikacio',
    loadChildren: './containers/authentication/authentication.module#AuthenticationModule',
  },
  {
    path: 'partner-regisztracio',
    redirectTo: 'auth/register-distributor'
  },
  {
    path: 'belepes',
    redirectTo: 'auth/login'
  },
  {
    path: ':slug',
    resolve: {
      seo: SeoResolver,
    },
    loadChildren: './containers/frontpage/frontpage.module#FrontpageModule',
    canActivate: [UrlGuard]
  },
];
