import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadModule } from 'src/app/core/component/load/load.module';

import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

import { DragDropModule } from "@angular/cdk/drag-drop";

// bootstr
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BlogComponent } from './blog.component';
import { ListBlogComponent } from './list/list.component';
import { CreateBlogComponent } from './create/create.component';

const routes: Routes = [
    {
        path: '', component: BlogComponent,
        children: [
            { path: '', component: ListBlogComponent },
            { path: 'list', component: ListBlogComponent },
            {
                path: 'create',
                component: CreateBlogComponent
            },
            {
                path: 'update',
                component: CreateBlogComponent
            }
        ]
    },
];
@NgModule({
    declarations: [
        ListBlogComponent,
        BlogComponent,
        CreateBlogComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        LoadModule,
        
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatStepperModule,
        MatButtonModule,
        DragDropModule,
// bootstr
        NgbModule
    ],
    exports: [RouterModule]
})
export class baseBlogModule { }
