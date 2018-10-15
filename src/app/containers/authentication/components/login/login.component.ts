import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


import { Observable } from 'rxjs';
import { AuthForm } from '../../../../core/store/models/auth.model';
import * as fromStore from "../../../../core/store/index";
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  	authLoginError$: Observable<boolean>;
  	form: FormGroup;
  	email: string;

	constructor(
		private store: Store<fromStore.MainState>,
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		) { 
	}
	ngOnInit() {

		this.store.select(fromStore.authEmail).subscribe((val) => {
			this.email = val;
		});

		this.form = new FormGroup({
			'password': new FormControl(null, [Validators.required]),
			'save': new FormControl(null),
		});

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
		this.authLoginError$ = this.store.select(fromStore.authLoginError);
  	}

	onFormSubmit() {
		this.form['submitted'] = true;
		if(!this.form.invalid){
			let formData = this.form.value;
			formData['email'] = this.email;
			this.store.dispatch(new fromStore.AuthLogin({ auth_form: formData }));
		}
	}
	backToAuth(){
		this.store.dispatch(new fromStore.AuthBackToAuth());
		this.router.navigate(['/auth']);
	}
	notNull(email){
		if(email == undefined){
			this.router.navigate(['/auth']);
		}
	}
	forgot(){
		let formData = this.form.value;
		formData['email'] = this.email;
		this.store.dispatch(new fromStore.AuthForgotPassword({ auth_form: formData}));
		this.router.navigate(['/auth/forgot']);
	}
}
