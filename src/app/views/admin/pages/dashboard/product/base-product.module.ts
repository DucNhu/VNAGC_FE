import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseProductComponent } from './base.component';


const routes: Routes = [
    {
        path: '', component: BaseProductComponent,
        children: [
            { path: '', component: ListProductComponent },
            { path: 'product-list', component: ListProductComponent }
        ]
    },
];
@NgModule({
    declarations: [
        ListProductComponent,
        BaseProductComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class baseProductModule { }
