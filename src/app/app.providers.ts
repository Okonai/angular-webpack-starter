// import { UserService } from './user/user.service';
import { RouterStateSerializer } from '@ngrx/router-store';
// import { CustomSerializer } from './reducers/index';
import { TransferState } from '@angular/platform-browser';
import {
  ProductService,
  NavigationService,
  NewsService,
  TilesService,
  SliderService,
  PromotionService,
  SearchService,
  UrlResolverService,
   ModalService,
   FilterService,
   AuthService,
   StaticService,
   SeoService,
   CartService,
   BannerService } from '@store/services/';
import { NavbarService } from '@core/services/navbar.service';
import { AuthGuard } from '@core/guards/auth/auth.guard';
import { UrlGuard } from '@core/guards/url/url.guard';
import { SiteGuard } from '@core/guards/site/site.guard';
import { AuthServiceConfig } from 'angular-6-social-login';
import { getAuthServiceConfigs } from '@core/core.module';
import { ApplicationHttpClient, applicationHttpClientCreator } from '@core/services/http.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '@services/user.service';
import { SeoResolver } from '@core/resolvers/seo.resolver';

export const APP_PROVIDERS = [
  /*{ provide: RouterStateSerializer, useClass: CustomSerializer },
  UserService, */
  NavigationService,
  UserService,
  SeoResolver,
  TransferState,
  ProductService,
  NavigationService,
  NewsService,
  TilesService,
  SliderService,
  PromotionService,
  SearchService,
  UrlResolverService,
  ModalService,
  FilterService,
  AuthService,
  NavbarService,
  StaticService,
  SeoService,
  CartService,
  BannerService,
  AuthGuard,
  UrlGuard,
  SiteGuard,
  {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  },
  {
    provide: ApplicationHttpClient,
    useFactory: applicationHttpClientCreator,
    deps: [HttpClient]
  }
];
