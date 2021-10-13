import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { rejects } from 'assert';
import { ProductService } from 'src/app/core/_service/product.service';
import { product } from 'src/app/models/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateProductComponent implements OnInit {
  loading = true;
  listSale = [10, 20, 30, 40]
  listUnit = ["boxes", "package", "Bottle"]
  listCategory = ["Fruit", "Drink", "Cake"]
  money = 0;
  // Step bar
  isEditable = true;
  // End Step bar
  formInfor: FormGroup;
  formImg: FormGroup;


  avatar;
  avatar_cover;
  list_img_feature: any = [{ data: '' }];
  product: product;
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
      active: [false],
      unit: [''],
      storage_instructions: [''],
      "create_at": [''],
      "update_at": [''],
    });

    this.formImg = this.fb.group({
    });
  }
  productId = this.activatedRoute.snapshot.paramMap.get('id');

  ngOnInit(): void {
    Promise.all(
      [
        this.getProduct(),
        this.getProductImgFeature(),
      ]
    ).then(
      dt => {
        this.loading = false;
        this.setDataforForm(dt[0]);
        this.product = dt[0];
        console.log(this.product)
        this.avatar = dt[0].banner_img;
        this.avatar_cover = dt[0].cover_img;

        this.list_img_feature = dt[1].map(x => {
          if (x) { x.dataByDb = true }
          return x
        })
      }
    )
      .catch(
        rejects => {
          this.loading = false;
        }
      )
  }
  getProduct(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.productService.getProduct(this.productId).toPromise();
      resolve(dt);
    });
  }
  getProductImgFeature(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.productService.GetImgProductFeature(this.productId).toPromise();
      resolve(dt);
    });
  }
  updateProduct() {
    let form = this.formInfor;
    let nowDate = new Date();
    let nowTime = new Date().toLocaleTimeString();
    let data = {
      "id": this.productId,
      "name": form.get('name').value,
      "banner_img": this.avatar,
      "cover_img": this.avatar_cover,
      "category": form.get('category').value,
      "price": form.get('price').value,
      "sale": form.get('sale').value,
      "description": form.get('description').value,
      "unit": "boxes",
      "storage_instructions": form.get('storage_instructions').value,
      "status": 0,
      "create_at": this.product.create_at,
      "update_at": nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate() + "T" + nowTime,
    }
    this.loading = true;
    this.productService.update(data).subscribe(
      dt => {
        this.sendImg()
      },
      err => {
        this.loading = false;
        console.log(err)
      }
    )
  }

  setDataforForm(dt) {
    this.formInfor.patchValue({
      name: dt.name,
      category: "Fruit",
      price: dt.price,
      sale: dt.sale,
      description: dt.description,
      active: dt.status,
      unit: dt.unit,
      storage_instructions: dt.storage_instructions,
      create_at: dt.create_at,
      update_at: dt.update_at
    })
  }

  permitFile;
  indexOflist_img_feature = 0;
  updateFile(event, type) {
    let fileList: FileList = event.target.files;
    const file: File = fileList[0];
    this.permitFile = file;
    this.handleInputChange(file, type, 0); //turn into base64
  }

  updateListFile(event, index) {
    let fileList: FileList = event.target.files;
    const file: File = fileList[0];
    this.permitFile = file;
    this.handleInputChange(file, index, 1); //turn into base64
  }
  handleInputChange(files, type, isListImgFeature) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    if (isListImgFeature) {
      reader.onloadend = this.setImgFeature.bind(this);
      this.indexOflist_img_feature = type;
    }
    else {
      if (type) {
        reader.onloadend = this.setValueAvatar.bind(this);
      }
      else {
        reader.onloadend = this.setValueAvatarCover.bind(this);
      }
    }

    reader.readAsDataURL(file);
  }
  setValueAvatar(e) {
    let reader = e.target;
    this.avatar = 'data:image/png;base64,' + reader.result.substr(reader.result.indexOf(',') + 1);
  }
  setValueAvatarCover(e) {
    let reader = e.target;
    this.avatar_cover = 'data:image/png;base64,' + reader.result.substr(reader.result.indexOf(',') + 1);
  }
  setImgFeature(e) {
    let reader = e.target;
    this.list_img_feature[this.indexOflist_img_feature].avatar_feature = 'data:image/png;base64,' + reader.result.substr(reader.result.indexOf(',') + 1);
  }

  addSlotImgFeature() {
    if (this.list_img_feature.length != 0) {
      if (this.list_img_feature[this.list_img_feature.length - 1].avatar_feature) {
        this.list_img_feature.push({ dataByDb: false })
      }
    }
    else { this.list_img_feature.push({ dataByDb: false }) }
  }

  sendImg() {
    let checkCountImg = 0;
    this.list_img_feature.forEach((item, index) => {
      let data = {
        "id": item.id,
        "product_id": this.productId,
        "avatar_feature": item.avatar_feature
      }
      if (item.id) {
        this.productService.updateImgFeature(data).subscribe(
          () => {
          },
          err => {
            this.route.navigate(["/err"])
          }
        )
        checkCountImg++;
      }
      else {
        delete data.id
        this.productService.createImgFeature(data).subscribe(
          dt => {
            this.list_img_feature[index].id = dt.id;
          },
          err => {
            this.route.navigate(["/err"])
          }
        )
        checkCountImg++;
      }
      if (checkCountImg == this.list_img_feature.length) {
        this.loading = false;
        this.route.navigate(["/admin/product/list"])
      }
    });
  }
}
