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
  ];

  urlImg = this.categoryService.urlImg;
  displayedColumns: string[] = ['id', 'name', 'countBlog', 'createdDate', 'action'];
  dataSource = new MatTableDataSource(this.listCategory);

  load = false;
  modalRef?: BsModalRef;
  newCategory = '';
  editNameCategory = '';
  Category_delete = {
    id: 0,
    index: 0
  }
  editId = 0;
  avatar;
  constructor(
    private categoryService: CategoryService,
    private modalService: BsModalService,
  ) {
  }

  ngOnInit(): void {
    Promise.all(
      [
        this.getCategory()
      ]
    ).then(
      (dt: any) => {
        this.listCategory = dt[0].Data;
        this.listCategory.forEach((e, i) => {
          this.listCategory[i].index = i;
        });
        this.load = false;
      },
      err => {
        this.load = false;
      }
    )
  }
  isEdit = false;
  editCategory(item) {
    this.isEdit = true;
    this.editId = item.id;
    this.editNameCategory = item.name
  }

  getCategory(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.categoryService.getCategorys().toPromise();
      resolve(dt);
    });
  }

  addNewCategory() {
    let aname = this.newCategory;
    
    if (aname.trim() == '') {
      return
    }
    let data = new FormData();
    data.append('name', aname);
    data.append('file', this.img, this.img.name);
    this.load = true;
    this.categoryService.createCategory(data).subscribe(
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
        this.newCategory = '';
      },
      err => {
        this.load = false;
      }
    )
  }

  saveEditCategory(index) {
    if (this.editNameCategory.trim() == '') {
      return
    }
    this.load = true;
    let name = {
      "id": this.editId,
      "name": this.editNameCategory,
    };
    this.newCategory = '';
    this.categoryService.updateCategory(name).subscribe(
      dt => {
        this.load = false;
        this.editId = 0; this.isEdit = false;
        this.listCategory[index].name = this.editNameCategory;
        this.dataSource = new MatTableDataSource(this.listCategory)
      },
      err => {
        this.load = false;
      }
    )
  }

  deleteCategory() {
    this.load = true;
    this.categoryService.deleteCategory(this.Category_delete.id).subscribe(
      dt => {
        if (dt.Data) {
          this.listCategory.splice(this.Category_delete.index, 1);
          this.listCategory.forEach((e, i) => {
            this.listCategory[i].index = i;
          });
          this.dataSource = new MatTableDataSource(this.listCategory);
          this.closeModal();
        }
        else {
          this.load = false;
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

  img;
  loadImg(event) {
    let reader = new FileReader();
    this.img = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(this.img);
      reader.onload = () => {
        const img = new Image();

        img.src = reader.result as string;
        img.onload = () => {
          var typeFile = this.img.name.split('.').pop();
          this.avatar = {
            file_name: this.img.name.replaceAll(/[^a-zA-Z0-9_\-]/g, '').replaceAll(typeFile, '') + '.' + typeFile,
            file_data: reader.result
          }
        }
      }
    }
    else {
      console.log("IL")
    }
    
  }


  openModal(template: TemplateRef<any>, element) {
    this.Category_delete.id = element.id;
    this.Category_delete.index = element.index;

    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalService.hide();
    this.load = false;
  }
}
