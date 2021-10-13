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

  avatar;
  avatar_cover;
  list_img_feature: any = [{ data: '' }];
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
      unit: [''],
      active: [false],

      storage_instructions: [''],
    });

    this.formImg = this.fb.group({
      // avatar: ['',],
      // avatar_cover: ['',],
      // listImg_feature: new FormArray([]),
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
      "banner_img": this.avatar,
      "cover_img": this.avatar_cover,
      "category": form.get('category').value,
      "price": form.get('price').value,
      "sale": form.get('sale').value,
      "description": form.get('description').value,
      "unit": form.get('unit').value,
      "storage_instructions": form.get('storage_instructions').value,

      "active": form.get('active').value,
      "create_at": nowDate.split('/').reverse().join('-') + "T" + nowTime,
      "update_at": nowDate.split('/').reverse().join('-') + "T" + nowTime,
    }
    // this.loading = true;
    console.log(nowDate, nowDate.split('/').reverse().join('-'))
    // this.prductService.create(data).subscribe(
    //   dt => {
    //     this.sendImg(dt)
    //     this.route.navigate(["/admin/product/list"])
    //   },
    //   err => {
    //     this.loading = false;
    //   }
    // )
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
    this.list_img_feature[this.indexOflist_img_feature].data = 'data:image/png;base64,' + reader.result.substr(reader.result.indexOf(',') + 1);
  }

  addSlotImgFeature() {
    if (this.list_img_feature.length != 0) {
      if (this.list_img_feature[this.list_img_feature.length - 1].data) {
        this.list_img_feature.push({ data: '' })
      }
    }
    else { this.list_img_feature.push({ data: '' }) }
  }

  sendImg(val) {
    this.list_img_feature.forEach(item => {
      let data = {
        "product_id": val.id,
        "avatar_feature": item.data
      }
      this.prductService.createImgFeature(data).subscribe(
        dt => {
          this.loading = false;
          this.route.navigate(["/admin/product/list"])
        },
        err => {
          this.loading = false;
        }
      )
    });
  }
}
