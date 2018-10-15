import * as fromStore from "../../../../core/store/index";
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Address } from '../../../../core/store/models/user.model';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddressesComponent implements OnInit {
  title: string;
  type: string;
  addresses$: Observable<Address[]>;
  addressFormOpened$: Observable<boolean>;  
  loading$: Observable<boolean>;

  constructor(route: ActivatedRoute, private store: Store<fromStore.MainState>) {
    this.title = route.snapshot.data.title;
    this.type = route.snapshot.data.type;
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.SelectAddressTypeAction({ type: this.type }));
    this.addresses$ = this.store.select(fromStore.getUserAddresses);
    this.addresses$.subscribe(addresses => {
      console.log(addresses);
    })
    this.addressFormOpened$ = this.store.select(fromStore.getAddressFormOpened);
    this.loading$ = this.store.select(fromStore.getUserLoading);
  }

  editAddress(id) {
    this.store.dispatch(new fromStore.EditAddressAction({ id: id }));
  }

  newAddress() {
    this.store.dispatch(new fromStore.AddAddressAction());
  }

  setAsDefault(address) {
    address = {
      ...address,
      is_default: true
    }
    this.store.dispatch(new fromStore.SetUserAddressAction({address: address, type: this.type}));
  }

  deleteAddress(id) {
    swal({
      title: 'Biztosan törölni szeretné ezt a címet?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7ac043',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Igen',
      cancelButtonText: 'Mégse',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(new fromStore.DeleteUserAddressAction({ type: this.type, id: id }));
      }
    })
    //this.store.dispatch(new fromStore.OpenConfirmModalAction({modal: successModal}));
  }
}