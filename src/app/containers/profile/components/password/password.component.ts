import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { User } from '../../../../core/store/models/auth.model';
import * as fromStore from '../../../../core/store';
import {Store} from '@ngrx/store';
import { Password } from '../../../../core/store/models/user.model';
import { PasswordValidation } from '../../../../core/helpers/validators/PasswordValidation';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PasswordComponent implements OnInit {

    user$: Observable<User>;
    hideOld: boolean = true;
    hideNew: boolean = true;
    passwordForm: FormGroup;  
    loading$: Observable<boolean>;
    public passwordStrengthBarColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  
    constructor(
      private store: Store<fromStore.MainState>,
      private fb: FormBuilder,
    ) { 
        this.passwordForm = this.fb.group({
            passwordOld: ['', [
              Validators.required
            ]],
            password: ['', [
              Validators.required,
              Validators.minLength(6),
              Validators
            ]],
            passwordRepeat: ['', [
              Validators.required
            ]]
          }, {
            validator: [
                PasswordValidation.MatchPassword
            ]
          });
      
          this.loading$ = this.store.select(fromStore.getUserLoading);
    }

    ngOnInit() {
     
    }

    submitForm() {
        const formValue = this.passwordForm.value as Password;
        this.store.dispatch(new fromStore.SetPasswordAction(formValue));
    }

    get passwordOld() {
        return this.passwordForm.get('passwordOld');
    }

    get password() {
        return this.passwordForm.get('password');
    }

    get passwordRepeat() {
        return this.passwordForm.get('passwordRepeat');
    }
}