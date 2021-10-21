import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavigationComponent } from '../../component/navigation/navigation.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { HeaderComponent } from '../../component/header/header.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    DashboardComponent,
     NavigationComponent,
     FooterComponent,
     HeaderComponent,
    ],
  imports: [
    CommonModule,
    MatMenuModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
