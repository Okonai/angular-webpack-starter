import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as fromStore from "../../../../core/store/index";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../../../core/store/models/auth.model';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalComponent implements OnInit {

  user$: Observable<User>;
  personalForm: FormGroup;  
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.MainState>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {    
    this.personalForm = this.fb.group({
      first_name: ['', [
        Validators.required
      ]],
      last_name: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(9)
      ]]
    });
    
    this.store.select(fromStore.getAuthenticatedUser).subscribe(user => {
      this.personalForm.patchValue(user);
    });    

    this.loading$ = this.store.select(fromStore.getUserLoading);
  }

  submitForm() {
    const formValue = this.personalForm.value;
    this.store.dispatch(new fromStore.UpdateProfileAction({user: formValue}));
  }
  
  get first_name() {
    return this.personalForm.get('first_name');
  }

  get last_name() {
    return this.personalForm.get('last_name');
  }

  get email() {
    return this.personalForm.get('email');
  }

  get phone() {
    return this.personalForm.get('phone');
  }
  

}
