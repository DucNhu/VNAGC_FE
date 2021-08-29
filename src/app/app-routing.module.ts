import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/client/component/base/base.component';
import { LoginComponent } from './views/client/pages/authen/login/login.component';
import { CheckoutComponent } from './views/client/pages/checkout/checkout.component';
import { HomeComponent } from './views/client/pages/home/home.component';
import { ProductDetailComponent } from './views/client/pages/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./views/admin/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'product-detail',
        component: ProductDetailComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'home',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: '**',
    loadChildren: () => import('./views/client/pages/err-page/err-page.module').then(m => m.ErrPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
