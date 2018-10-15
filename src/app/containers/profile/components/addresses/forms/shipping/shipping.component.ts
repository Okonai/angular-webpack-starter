import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromStore from '@store/index';
import { shippingAddressFormGroup } from '@store/models/user.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  shippingForm: FormGroup;
  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.MainState>,
  ) {
    this.shippingForm = this.fb.group(shippingAddressFormGroup);
    this.store.select(fromStore.getUserAddress)
      .subscribe(selectedAddress => {
        if (typeof selectedAddress !== 'undefined') {
          this.shippingForm.patchValue(selectedAddress);
        } else {
          this.shippingForm.reset();
        }
      });
    this.loading$ = this.store.select(fromStore.getUserLoading);
  }

  ngOnInit() {

  }

  submitForm() {
    const formValue = this.shippingForm.value;
    this.store.dispatch(new fromStore.SetUserAddressAction({ address: formValue, type: 'shipping' }));
  }

  get city() {
    return this.shippingForm.get('city');
  }

  get zip_code() {
    return this.shippingForm.get('zip_code');
  }

  get street() {
    return this.shippingForm.get('street');
  }

  get phone() {
    return this.shippingForm.get('phone');
  }

  get is_default() {
    return this.shippingForm.get('is_default');
  }

  get id() {
    return this.shippingForm.get('id');
  }

  get country() {
    return this.shippingForm.get('country');
  }

  get extra_address() {
    return this.shippingForm.get('extra_address');
  }

  get comment() {
    return this.shippingForm.get('comment');
  }
}
