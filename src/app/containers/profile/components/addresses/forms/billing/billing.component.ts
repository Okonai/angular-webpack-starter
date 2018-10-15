import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../../core/store/index';
import { billingAddressFormGroup } from '../../../../../../core/store/models/user.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  billingForm: FormGroup;
  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.MainState>,
  ) {
    this.billingForm = this.fb.group(billingAddressFormGroup);
    this.store.select(fromStore.getUserAddress)
      .subscribe(selectedAddress => {
        if (typeof selectedAddress !== 'undefined') {
          this.billingForm.patchValue(selectedAddress);
        } else {
          this.billingForm.reset();
        }
      });
    this.loading$ = this.store.select(fromStore.getUserLoading);
  }

  ngOnInit() {

  }

  submitForm() {
    const formValue = this.billingForm.value;
    this.store.dispatch(new fromStore.SetUserAddressAction({ address: formValue, type: 'billing' }));
  }

  get city() {
    return this.billingForm.get('city');
  }

  get zip_code() {
    return this.billingForm.get('zip_code');
  }

  get street() {
    return this.billingForm.get('street');
  }

  get phone() {
    return this.billingForm.get('phone');
  }

  get is_default() {
    return this.billingForm.get('is_default');
  }

  get id() {
    return this.billingForm.get('id');
  }

  get country() {
    return this.billingForm.get('country');
  }
}
