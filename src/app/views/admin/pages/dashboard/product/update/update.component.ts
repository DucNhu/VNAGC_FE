import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/_service/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateProductComponent implements OnInit {


  loading = false;
  listSale = [10, 20, 30, 40]
  listUnit = ["Hộp", "Gói", "Chai"]
  listCategory = ["Fruit", "Drink", "Cake"]
  money = 0;
  // Step bar
  isEditable = true;
  // End Step bar
  load = true;
  formInfor: FormGroup;
  formImg: FormGroup;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formInfor = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, Validators.required],
      sale: [0],
      description: [''],
      active: [false, Validators.required],

      storage_instructions: [false, Validators.required],
      "create_at": [''],
      "update_at": [''],
    });

    this.formImg = this.fb.group({
      avatar: ['',],
      avatar_cover: ['',],
      listImg_feature: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.productService.getProduct(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (dt: any) => {
        this.load = false;
        console.log(dt);
        this.setDataforForm(dt);
      }
    )
    }
  updateProduct() {
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

    this.productService.update(data).subscribe(
      dt => {
        this.loading = false;
        this.route.navigate(["/admin/product/list"])
      }
    )
  }

  setDataforForm(dt) {
    this.formInfor.setValue({
      name: [dt.name],
      category: [dt.category],
      price: [dt.price],
      sale: [dt.sale],
      description: [dt.description],
      active: [dt.status],

      storage_instructions: [dt.storage_instructions],
      create_at: [dt.create_at],
      update_at: [dt.update_at]
    })
  }
}
