import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {PersonalComponent} from './components/personal/personal.component';
import {PasswordComponent} from './components/password/password.component';
import {OrdersComponent} from './components/orders/orders.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@modules/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddressesComponent } from './components/addresses/addresses.component';
import { BillingComponent } from './components/addresses/forms/billing/billing.component';
import { ShippingComponent } from './components/addresses/forms/shipping/shipping.component';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import {NgxPaginationModule} from 'ngx-pagination';
import { CurrencyFormatPipeModule } from '@core/pipes/currency.pipe';

const COMPONENTS = [
    ProfileComponent,
    PersonalComponent,
    AddressesComponent,
    OrdersComponent,
    PasswordComponent,
    BillingComponent,
    ShippingComponent
];

@NgModule({
    imports: [
        MaterialModule,
        NgbModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PasswordStrengthBarModule,
        NgxPaginationModule,
      CurrencyFormatPipeModule,
        RouterModule.forChild([
            {
                path: '', component: ProfileComponent, children: [
                    {path: '', redirectTo: 'szemelyes'},
                    {path: 'szemelyes', component: PersonalComponent},
                    {path: 'szamlazas', component: AddressesComponent, data: {
                        title: 'Számlázási címek',
                        type: 'billing'
                    }},
                    {path: 'szallitas', component: AddressesComponent, data: {
                        title: 'Szállítási címek',
                        type: 'shipping'
                    }},
                    {path: 'jelszomodositas', component: PasswordComponent},
                    {path: 'rendeleseim', component: OrdersComponent},
                ]
            }
        ]),
    ],
    declarations: COMPONENTS,
    providers: []

})
export class ProfileModule {
}
