import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@modules/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { ApplicationHttpClient, applicationHttpClientCreator } from './services/http.service';
import { NavbarService } from './services/navbar.service';

import { effects, reducers } from './store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular5-social-login';
import { SearchComponent } from './components/search/search.component';
import { NotFoundPageComponent } from './containers/not-found-page/not-found-page.component';
import { CurrencyFormatPipeModule } from './pipes/currency.pipe';
import { BannerService } from './store/services/banner.service';

import {
  NavigationService,
  NewsService,
  PromotionService,
  SearchService,
  SliderService,
  TilesService,
  ProductService,
  UrlResolverService,
  ModalService,
  FilterService,
  AuthService,
  StaticService,
  SeoService,
  CartService,
} from '@store/services';
import { HighlightQueryString } from '@core/pipes/search.pipe';
import { AuthGuard } from '@core/guards/auth/auth.guard';
import { UrlGuard } from '@core/guards/url/url.guard';
import { AllcategoryComponent } from '../containers/allcategory/allcategory.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SiteGuard } from '@core/guards/site/site.guard';
import { CartModule } from '../containers/cart/cart.module';

export function getAuthServiceConfigs () {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('193035801316778')
      }/*,
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("Your-Google-Client-Id")
        },*/
    ]
  );
  return config;
}

export const COMPONENTS = [
  NotFoundPageComponent,
  HeaderComponent,
  FooterComponent,
  NavigationComponent,
  SearchComponent,
  HighlightQueryString,
  AllcategoryComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, BrowserAnimationsModule,
    StoreModule.forFeature('store', reducers),
    EffectsModule.forFeature(effects),
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    CurrencyFormatPipeModule,
    NgxPermissionsModule.forRoot(),
    CartModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot () {
    return {
      ngModule: CoreModule,
      providers: [
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
      ]
    };
  }
}
