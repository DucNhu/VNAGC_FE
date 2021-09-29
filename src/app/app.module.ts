import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { APP_BASE_HREF } from '@angular/common';
import { ThemesModule } from './views/client/component/themes.module';
import { AppConfig } from './app.config';
import { HomeComponent } from './views/client/pages/home/home.component';
import { ProductDetailComponent } from './views/client/pages/product-detail/product-detail.component';
import { CheckoutComponent } from './views/client/pages/checkout/checkout.component';
import { LoginComponent } from './views/client/pages/authen/login/login.component';
import { RegisterComponent } from './views/client/pages/authen/register/register.component';
import { ActiveAccountComponent } from './views/client/pages/authen/active-account/active-account.component';
import { LoadModule } from './core/component/load/load.module';
import { ToasterModule } from 'angular2-toaster';

import { MatFormFieldModule } from '@angular/material/form-field';
import { CartComponent } from './views/client/pages/cart/cart.component';
import { BlogDetailComponent } from './views/client/pages/blog-detail/blog-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { SwiperModule } from "swiper/angular";

export function initializeApp(AppConfig: AppConfig) {
  return () => AppConfig.load()
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    ActiveAccountComponent,
    CartComponent,
    BlogDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ThemesModule,
    FormsModule, ReactiveFormsModule,
    LoadModule,
    ToasterModule,
    NgbModule,
    // SwiperModule,
    // MatFormFieldModule,
    // MatInputModule
  ],
  providers: [AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    }
    , { provide: APP_BASE_HREF, useValue: '' }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
