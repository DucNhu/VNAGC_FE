import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { APP_BASE_HREF } from '@angular/common';
import { ThemesModule } from './views/client/component/themes.module';
import { HomeComponent } from './views/client/pages/home/home.component';
import { ProductDetailComponent } from './views/client/pages/product-detail/product-detail.component';
import { CheckoutComponent } from './views/client/pages/checkout/checkout.component';
import { LoginComponent } from './views/client/pages/authen/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailComponent,
    CheckoutComponent,
    LoginComponent,
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
