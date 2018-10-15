import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as fromStore from '@store/index';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Modal, SwalModal } from '@store/models/modal.model';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})

export class ModalModule {
  modal: Modal;
  hash: string;
  private sub: any;

  constructor ( private route: ActivatedRoute, private store: Store<fromStore.MainState>) {

    this.sub = this.route.fragment.subscribe(hash => {
      if (hash !== '' && hash != null && hash[1] !== '!') {
        this.store.dispatch(new fromStore.LoadModalAction({hash: hash}));
        this.store.select(fromStore.getModals).subscribe((modals) => {
          if (modals[hash] !== undefined) {
            this.store.dispatch(new fromStore.OpenModalAction({modal: modals[hash]}));
          }
        });
      }
      // this.hash = hash
   });
  }

  openModal (modal: SwalModal): void {
    this.store.dispatch(new fromStore.OpenModalAction({modal: modal}));
  }
}
