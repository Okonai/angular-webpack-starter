import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromStore from "../../core/store/index";
import { loaderAnimation } from '../../core/animations/loader.animation';
import { User } from '../../core/store/models/auth.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],  
  encapsulation: ViewEncapsulation.None,
  animations: [
    loaderAnimation
  ],  
})

export class ProfileComponent implements OnInit {

  user$: Observable<User>;
  loadingFinished$: Observable<boolean>;

  constructor(private store: Store<fromStore.MainState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.AuthLoadUser());    
    this.store.dispatch(new fromStore.LoadUserAddressesAction());
    this.loadingFinished$ = this.store.select(fromStore.getAuthLoaded);
    this.user$ = this.store.select(fromStore.getAuthenticatedUser)
  }
}