import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoryService } from 'src/app/core/_service/category/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

export interface PeriodicElement {
  name: string;
  position: number;
  countBlog: number;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  listCategory = [
    { id: null, name: null, countBlog: null, createdDate: null, action: 1, index: 0 }
  ];

  displayedColumns: string[] = ['id', 'name', 'countBlog', 'createdDate', 'action'];
  dataSource = new MatTableDataSource(this.listCategory);

  load = true;
  modalRef?: BsModalRef;
  newCategory = '';
  Category_delete = {
    id: 0,
    index: 0
  }
  constructor(
    private categoryService: CategoryService,
    private modalService: BsModalService,
  ) {
  }

  ngOnInit(): void {
    Promise.all(
      [
        this.getProduct()
      ]
    ).then(
      (dt: any) => {
        this.listCategory = dt[0].Data;
        this.listCategory.forEach((e, i) => {
          this.listCategory[i].index = i;
        });
        this.dataSource = new MatTableDataSource(this.listCategory)
        this.load = false;
      },
      err => {
        this.load = false;
      }
    )
  }

  editCategory(id) {
    alert(id)
  }

  getProduct(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.categoryService.getCategorys().toPromise();
      resolve(dt);
    });
  }

  addNewCategory() {
    this.load = true;
    let name = this.newCategory;
    this.newCategory='';
    this.categoryService.CreateCategory(name).subscribe(
      dt => {
        this.load = false;
        this.listCategory.unshift({
          id: dt.Data.id,
          name: dt.Data.name,
          countBlog: null,
          createdDate: dt.Data.createdDate,
          action: 1,
          index: 0
        });
        this.listCategory.forEach((e, i) => {
          this.listCategory[i].index = i;
        });
        this.dataSource = new MatTableDataSource(this.listCategory)
      },
      err => {
        this.load = false;
        console.log(err)
      }
    )
  }
  deleteCategory() {
    
    this.categoryService.deleteCategory(this.Category_delete.id).subscribe(
      dt => {
        if (dt.Data) {
          this.listCategory.splice(this.Category_delete.index, 1);
          this.dataSource = new MatTableDataSource(this.listCategory)
        }
        else {

        }
      },
      err => {
        this.load = false;
        console.log(err)
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openModal(template: TemplateRef<any>, element) {
    this.Category_delete.id = element.id;
    this.Category_delete.index = element.index;

    this.modalRef = this.modalService.show(template);
  }
}
