import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


import { Observable } from 'rxjs';
import { AuthForm } from '../../../../core/store/models/auth.model';
import * as fromStore from "../../../../core/store/index";
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  	authForgotError$: Observable<boolean>;
  	form: FormGroup;
  	code: string;
  	email: string;
  	matcher = new MyErrorStateMatcher();


	constructor(
		private store: Store<fromStore.MainState>,
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		) { 
	}
	ngOnInit() {

		this.store.select(fromStore.authGoTo).subscribe((where) => {
			if(where !== undefined && where != 'login')
				this.router.navigate(['/auth/' + where]);
		});

		this.store.select(fromStore.authEmail).subscribe((val) => {
			this.email = val;
		});
		this.form = new FormGroup({
			'code': new FormControl(null, [Validators.required]),
			'password': new FormControl(null, [Validators.required]),
			'passwordConfirm': new FormControl(null, [Validators.required]),
		}, [this.checkboxValidator]);

		this.authForgotError$ = this.store.select(fromStore.authForgotCodeError);

		this.store.select(fromStore.authPopup).subscribe((val) => {
			if(val.title && val.message && val.type)
				this.store.dispatch(new fromStore.OpenModalAction({
		            modal: {
		                title: val.title,
		                text: val.message,
		                icon: val.type,
		            }
		        }));
		});
		this.store.select(fromStore.hashCode).subscribe((val) => {
			this.form.get('code').setValue(val);
		});
  	}

	checkboxValidator(frm: FormGroup) {
		let obj = {};
		if(frm.get('password').value !== frm.get('passwordConfirm').value)
			obj['mismatch'] = true;
		return  Object.keys(obj).length ? obj : null;
	}
	onFormSubmit() {
		this.form['submitted'] = true;
		if(!this.form.invalid){
			let formData = this.form.value;
			this.store.dispatch(new fromStore.AuthForgotPasswordUpdate({ forgot_form: formData }));
		}
	}
	backToLogin(){
		this.store.dispatch(new fromStore.AuthBackToAuth());
		this.router.navigate(['/auth/login']);
	}
	nullForm(){
		this.store.dispatch(new fromStore.AuthResetForgotCodeError());
		this.router.navigate(['/auth/noaccess']);
	}
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
		return !!( control && form && (control.dirty || control.touched) && form.errors && form.errors['mismatch'] === true);
	}
}