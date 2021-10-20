import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { LoadModule } from 'src/app/core/component/load/load.module';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    children: [
      {
        path: '', component: ProfileDetailComponent
      },
      {
        path: 'detail', component: ProfileDetailComponent
      },
      {
        path: 'order-manager', component: OrderManagerComponent
      }
    ]
  }
]

@NgModule({
  declarations: [ProfileComponent, OrderManagerComponent, ProfileDetailComponent],
  imports: [
    CommonModule,
    LoadModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
