import * as fromStore from '@store/index';

import { Component, OnInit, Input } from '@angular/core';
import { loaderAnimation } from '@core/animations/loader.animation';
import { Observable } from 'rxjs';
import { ProductCard, ProductExtend, Product } from '@models/product.model';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ResolvedUrl } from '@models/urlresolver.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [
    loaderAnimation
  ]
})
export class ProductComponent implements OnInit {

  breakpoint$: Observable<string>;
  product$: Observable<Product>;
  loadingFinished$: Observable<boolean>;
  viewClass: string;
  longDescription: SafeHtml;

  constructor(
    private store: Store<fromStore.MainState>,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.breakpoint$ = this.store.select(fromStore.getActiveBreakpoint);
    const resolvedUrl: ResolvedUrl = this.activatedRoute.snapshot.data.resolvedUrl;

    this.store.dispatch(new fromStore.LoadProductAction({ id: resolvedUrl.id }));
    this.product$ = this.store.select(fromStore.getSelectedProduct);

    this.store.select(fromStore.getActiveBreakpoint).subscribe(breakpoint => {
      if (breakpoint === 'small') {
        this.viewClass = 'compact';
      } else {
        this.viewClass = 'box';
      }
    });


    //this.relatedProductEntities$ = this.store.select(fromStore.getRelatedProductEntities);
    //this.productExtended$ = this.store.select(fromStore.ge);
    //this.productInfo$ = this.store.select(fromStore.getProductInfo);

    /*this.productInfo$.subscribe((productInfo) => {
      if (productInfo !== undefined) this.longDescription = this.sanitizer.bypassSecurityTrustHtml(productInfo.longDescription);
    });*/

    this.loadingFinished$ = this.store.select(fromStore.getProductLoading);
  }
}
