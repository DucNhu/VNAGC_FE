import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { APP_BASE_HREF } from '@angular/common';
import { ThemesModule } from './client/component/themes.module';
import { HomeComponent } from './client/pages/home/home.component';
import { ProductDetailComponent } from './client/pages/product-detail/product-detail.component';
import { CheckoutComponent } from './client/pages/checkout/checkout.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ThemesModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
