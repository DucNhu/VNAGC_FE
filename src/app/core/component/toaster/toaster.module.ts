import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './toaster.component';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  declarations: [ToasterComponent],
  imports: [
    CommonModule,
    ToasterModule
  ]
})
export class ToasteModule { }
