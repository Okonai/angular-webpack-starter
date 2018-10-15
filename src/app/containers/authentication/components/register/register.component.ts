import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Observable } from 'rxjs';
import { AuthForm } from '../../../../core/store/models/auth.model';
import * as fromStore from '../../../../core/store/index';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    form: FormGroup;
    email: string;
    matcher = new MyErrorStateMatcher();

  constructor (
    private store: Store<fromStore.MainState>,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    ) {
    this.form['submitted'] = false;
  }

  ngOnInit () {

    this.store.select(fromStore.authEmail).subscribe((email) => {
      if (typeof email === 'undefined') {
        this.router.navigate(['/auth']);
      } else {
        this.email = email;
      }
    });

    this.form = new FormGroup({
      'phone': new FormControl(null, [Validators.required]),
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      // 'email': new FormControl({value: this.email, disabled: true}, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'passwordConfirm': new FormControl(null, [Validators.required]),
      'aszf': new FormControl(null, [Validators.required]),
      'newsletter': new FormControl(null, [])
    }, [this.checkboxValidator]);

    this.store.select(fromStore.authPopup).subscribe((val) => {
      if (val.title && val.message && val.type) {
        this.store.dispatch(new fromStore.OpenModalAction({
                modal: {
                    title: val.title,
                    text: val.message,
                    icon: val.type,
                }
            }));
      }
    });

  }

  checkboxValidator (frm: FormGroup) {
    let obj = {};
    if (!frm.get('aszf').value) {
      obj['aszf'] = true;
    }
    if (frm.get('password').value !== frm.get('passwordConfirm').value) {
      obj['mismatch'] = true;
    }
    return  Object.keys(obj).length ? obj : null;
  }

  onFormSubmit () {
    this.form['submitted'] = true;
    if (!this.form.invalid) {
      let formData = this.form.value;
      formData['email'] = this.email;
      this.store.dispatch(new fromStore.AuthRegister({ register_form: formData }));
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState (control: FormControl | null, form: FormGroupDirective | null): boolean {
    return !!( control && form && (control.dirty || control.touched) && form.errors && form.errors['mismatch'] === true);
  }
}
