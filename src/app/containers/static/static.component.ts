
import {distinctUntilChanged, take} from 'rxjs/operators';
import { Component, OnInit, SimpleChanges, ViewEncapsulation  } from '@angular/core';
import * as fromStore from '../../core/store/index';
import { Store } from '@ngrx/store';
import { StaticPage } from '../../core/store/models/static.model';
import { Observable } from 'rxjs';
import { loaderAnimation } from '../../core/animations/loader.animation';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],
  animations: [
    loaderAnimation
  ],  
  encapsulation: ViewEncapsulation.None
})

export class StaticComponent implements OnInit {

  staticPage$: Observable<StaticPage>;  
  loadingFinished$: Observable<boolean>;

  constructor(private store: Store<fromStore.MainState>) { }

  ngOnChanges(changes: SimpleChanges) {    
    if( changes.resolvedId.currentValue > 0) {
      this.store.dispatch(new fromStore.LoadStaticAction({staticId: changes.resolvedId.currentValue}));
    }    
  }

  ngOnInit() {
    this.store.select(fromStore.getResolvedUrl).pipe(take(1),distinctUntilChanged(),)
    .subscribe(resolvedUrl => {
      this.store.dispatch(new fromStore.LoadStaticAction({staticId: resolvedUrl.id}));
    })
    this.staticPage$ = this.store.select(fromStore.getStaticPage);
    this.loadingFinished$ = this.store.select(fromStore.getStaticPageLoaded);
  }

}