import { NgModule } from '@angular/core';

import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@modules/material';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { RegisterDistributorComponent } from './components/register-distributor/register-distributor.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { ForgotSuccessComponent } from './components/forgot-success/forgot-success.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { RegisterNoaccessComponent } from './components/register-noaccess/register-noaccess.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { AuthGuard } from '../../core/guards/auth/auth.guard';

@NgModule({
  imports: [
      CommonModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild([
        {path: '', component: AuthWrapperComponent, children: [
          { path: '', component: AuthenticationComponent },
          { path: 'login', component: LoginComponent,
            canLoad: [AuthGuard],
            data: {
              authGuardConfig: {
                authenticatedCanLoad: false,
                redirectTo: "/profil"
              }
            }
          },
          { path: 'login-success', component: LoginSuccessComponent },
          { path: 'register', component: RegisterComponent },
          { path: 'register-success', component: RegisterSuccessComponent },
          { path: 'register-distributor', component: RegisterDistributorComponent },
          { path: 'forgot', component: ForgotComponent },
          { path: 'noaccess', component: RegisterNoaccessComponent},
          { path: 'forgot-success', component: ForgotSuccessComponent },
          { path: 'logout', component: LogoutComponent },
        ]}    		
      ]),
    ],
  declarations: [AuthenticationComponent, AuthWrapperComponent, RegisterComponent, LoginComponent, ForgotComponent, RegisterDistributorComponent, LoginSuccessComponent, ForgotSuccessComponent, RegisterSuccessComponent, RegisterNoaccessComponent, LogoutComponent]
})
export class AuthenticationModule { }
