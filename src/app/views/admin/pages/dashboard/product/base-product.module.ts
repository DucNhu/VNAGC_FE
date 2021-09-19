import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseProductComponent } from './base.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProductCreateComponent } from './create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

const routes: Routes = [
    {
        path: '', component: BaseProductComponent,
        children: [
            { path: '', component: ListProductComponent },
            { path: 'list', component: ListProductComponent },
            {
                path: 'create',
                component: ProductCreateComponent
            },
            {
                path: 'update',
                component: ProductCreateComponent
            }
        ]
    },
];
@NgModule({
    declarations: [
        ListProductComponent,
        BaseProductComponent,
        ProductCreateComponent,
        ProductUpdateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatMenuModule,
    ],
    exports: [RouterModule]
})
export class baseProductModule { }
