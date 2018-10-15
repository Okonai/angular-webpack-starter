import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('passwordRepeat').value; // to get value in input tag
        if(password != confirmPassword) {
            AC.get('passwordRepeat').setErrors( {MatchPassword: true} )
        } else {
            //AC.get('new_password_confirm').updateValueAndValidity();
            return null
        }
    }
}