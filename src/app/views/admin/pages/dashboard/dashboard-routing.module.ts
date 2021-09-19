import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseDashboardComponent } from './base/base.component';

import { DashboardComponent } from './dashboard.component';
import { ListProductComponent } from './product/list/list.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', component: BaseDashboardComponent },
      { path: 'product', loadChildren: () => import('./product/base-product.module').then(m => m.baseProductModule) },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
