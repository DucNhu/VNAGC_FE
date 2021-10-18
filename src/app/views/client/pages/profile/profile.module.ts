import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { LoadModule } from 'src/app/core/component/load/load.module';

const routes: Routes = [
  {
    path: '', component: ProfileComponent
  }
]

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    LoadModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
