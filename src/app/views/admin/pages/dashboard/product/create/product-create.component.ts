import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/_service/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  loading = false;
  listSale = [10, 20, 30, 40]
  listUnit = ["boxes", "package", "Bottle"]
  listCategory = ["Fruit", "Drink", "Cake"]
  money = 0;
  // Step bar
  isEditable = true;
  // End Step bar

  formInfor: FormGroup;
  formImg: FormGroup;
  constructor(
    private fb: FormBuilder,
    private prductService: ProductService,
    private route: Router
  ) {
    this.formInfor = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, Validators.required],
      sale: [0],
      description: [''],
      active: [false, Validators.required],

      storage_instructions: ['', Validators.required],
    });

    this.formImg = this.fb.group({
      avatar: ['',],
      avatar_cover: ['',],
      listImg_feature: new FormArray([]),
    });
  }

  ngOnInit(): void {

  }
  createProduct() {
    let form = this.formInfor;
    let nowDate = new Date().toLocaleDateString();
    let nowTime = new Date().toLocaleTimeString();
    let data = {
      "name": form.get('name').value,
      "category": form.get('category').value,
      "price": form.get('price').value,
      "sale": form.get('sale').value,
      "description": form.get('description').value,
      "active": form.get('active').value,
      "create_at": nowDate.split('/').reverse().join('-') + "T" + nowTime,
      "update_at": nowDate.split('/').reverse().join('-') + "T" + nowTime,
    }
    this.loading = true;

    this.prductService.create(data).subscribe(
      dt => {
        console.log(dt)
        this.loading = false;
        this.route.navigate(["/admin/product/list"])
      }
    )
  }
}
