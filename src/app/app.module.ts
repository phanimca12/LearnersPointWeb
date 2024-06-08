import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonModule } from 'primeng/button';
import { MasterPageComponent } from './feature/components/master-page/master-page.component';
import { WelComePageComponent } from './feature/components/wel-come-page/wel-come-page.component';
import { SupplierComponent } from './feature/components/supplier/supplier.component';
import { CustomerComponent } from './feature/components/customer/customer.component';
import { RouterModule } from '@angular/router';
import { ApplicationRoutes } from './routing/app-routing-file';
import { PrimeNgModule } from './primeng.module';




@NgModule({
  declarations: [
    AppComponent,
    MasterPageComponent,
    WelComePageComponent,
    SupplierComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    PrimeNgModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ButtonModule,
    RouterModule.forRoot(ApplicationRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
