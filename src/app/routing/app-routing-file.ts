import { Component } from '@angular/core';

import { SupplierComponent } from '../feature/components/supplier/supplier.component';
import { CustomerComponent } from '../feature/components/customer/customer.component';
import { WelComePageComponent } from '../feature/components/wel-come-page/wel-come-page.component'

export const ApplicationRoutes = [
    { path: 'Customer', component: CustomerComponent },
    { path: 'Supplier', component: SupplierComponent },
    { path: 'Welcome', component: WelComePageComponent },
		{ path: '', component: WelComePageComponent }
];