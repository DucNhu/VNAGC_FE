import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './client/component/base/base.component';
import { CheckoutComponent } from './client/pages/checkout/checkout.component';
import { HomeComponent } from './client/pages/home/home.component';
import { ProductDetailComponent } from './client/pages/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
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
    loadChildren: () => import('./client/pages/err-page/err-page.module').then(m => m.ErrPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
