import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import {
  CdkDrag,
  CdkDragStart,
  CdkDropList,
  CdkDropListGroup,
  CdkDragMove,
  CdkDragEnter,
  moveItemInArray
} from "@angular/cdk/drag-drop";
import { ViewportRuler } from "@angular/cdk/overlay";
import { BlogService } from 'src/app/core/_service/blog/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateBlogComponent implements OnInit {
  listCategory = ["Tea", "Coffe", "Coca"];
  time = { hour: 13, minute: 30 };
  selectedHastags: any[];
  hastags: any[] = [
    { id: 1, viewValue: "material saving" },
    { id: 2, viewValue: "easy" },
    { id: 3, viewValue: "fast" },
    { id: 4, viewValue: "sweet things" },
    { id: 5, viewValue: "Appetizer" }
  ];
  listUnit = ["gam", "liter", "ml"]
  formBlog: FormGroup;
  isCollapsed = {
    metarial: false,
    step: false,
    content: false
  };

  avatar;
  avatar_cover;
  list_img_step: any = [{ data: '' }];
  list_img_content: any = [{ data: '' }];

  loading = false;
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.registerFormBlog();
    console.log(this.listContent())
  }

  registerFormBlog() {
    this.formBlog = this.fb.group(
      {
        name: ['', Validators.compose([
          Validators.required
        ])],
        category: ['', Validators.compose([
          Validators.required
        ])],
        hashTag: ['', Validators.compose([
          Validators.required
        ])],
        cooking_time: [''],
        summary: [''],
        description: [''],
        url_video_utube: [''],

        metarial: this.fb.array([]),
        step: this.fb.array([]),
        content: this.fb.array([]),
      }
    )
    this.addContent();
    this.addMetarial();
    this.addStep();
  }

  listStep = () => {
    return (this.formBlog.get('step') as FormArray).controls;
  }
  addStep() {
    return this.listStep().push(
      this.fb.group({
        name: ['', Validators.compose(
          [Validators.required]
        )],
        description: ['', Validators.compose(
          [Validators.required]
        )],
        avatar: ['']
      })
    )
  }
  removeStep(i) {
    return (this.formBlog.get('step') as FormArray).removeAt(i)
  }

  listMetarial = () => {
    return (this.formBlog.get('metarial') as FormArray).controls;
  }
  addMetarial() {
    return this.listMetarial().push(
      this.fb.group({
        name: ['', Validators.compose(
          [Validators.required]
        )],
        content: ['', Validators.compose(
          [Validators.required]
        )],
        unit: ['', Validators.compose(
          [Validators.required]
        )]
      })
    )
  }
  removeMetarial(i) {
    return (this.formBlog.get('metarial') as FormArray).removeAt(i)
  }

  listContent = () => {
    return (this.formBlog.get('content') as FormArray).controls;
  }
  addContent() {
    return this.listContent().push(
      this.fb.group({
        title: ['', Validators.compose(
          [Validators.required]
        )],
        avatar: [''],
        avatar_cover: [''],
        description: [''],
        url_youtube: ['']
      })
    )
  }
  removeContent(i) {
    return (this.formBlog.get('content') as FormArray).removeAt(i)
  }
  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }
  // array is selectedHastags
  selectAll(select: MatSelect, values, array) {
    select.value = values;
    array = values;
  }

  deselectAll(select: MatSelect) {
    this.selectedHastags = [];
    select.value = [];
  }

  // Logic Image
  permitFile;
  indexOflist_img_feature = 0;
  isListStep = 0;
  isAvatarCover=false;
  updateFile(event, type) {
    let fileList: FileList = event.target.files;
    const file: File = fileList[0];
    this.permitFile = file;
    this.handleAvatarBlog(file, type); //turn into base64
  }

  handleAvatarBlog(files, type) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    if (type) {
      reader.onloadend = this.setValueAvatar.bind(this);
    }
    else {
      reader.onloadend = this.setValueAvatarCover.bind(this);
    }
    reader.readAsDataURL(file);
  }

  updateListFile(event, index, type, isAvatarCover?) {
    let fileList: FileList = event.target.files;
    const file: File = fileList[0];
    this.permitFile = file;
    this.isListStep = type;
    this.isAvatarCover = isAvatarCover;
    this.handleInputChange(file, index); //turn into base64
  }
  handleInputChange(files, index) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.indexOflist_img_feature = index;

    reader.onloadend = this.setImgListAvatar.bind(this);
    reader.readAsDataURL(file);
  }
  setImgListAvatar(e) {
    let reader = e.target;
    let data = 'data:image/png;base64,' + reader.result.substr(reader.result.indexOf(',') + 1);
    if (this.isListStep) { // is step
      this.listStep()[this.indexOflist_img_feature].patchValue({ avatar: data })
    }
    else { // is content
      console.log(this.isAvatarCover)
      if (!this.isAvatarCover) {
        this.listContent()[this.indexOflist_img_feature].patchValue({ avatar: data })
      }
      else {
        this.listContent()[this.indexOflist_img_feature].patchValue({ avatar_cover: data })
      }
    }
  }
  setValueAvatar(e) {
    let reader = e.target;
    this.avatar = 'data:image/png;base64,' + reader.result.substr(reader.result.indexOf(',') + 1);
  }
  setValueAvatarCover(e) {
    let reader = e.target;
    this.avatar_cover = 'data:image/png;base64,' + reader.result.substr(reader.result.indexOf(',') + 1);
  }

  createBlog() {
    let form = this.formBlog;
    let nowDate = new Date().toLocaleDateString();
    let nowTime = new Date().toLocaleTimeString();
    let data = {
      "name": form.get('name'),
      "banner_img": this.avatar,
      "cover_img": this.avatar_cover,
      "cooking_time": form.get('cooking_time'),
      "summary": form.get('summary'),
      "description": form.get('desciption'),
      "url_video_utube": form.get('url_video_utube'),
      "view": 0,
      "status": 0,
      "user_id": '1',
      "category_id": 0,

      "create_at": nowDate.split('/').reverse().join('-') + "T" + nowTime,
      "update_at": nowDate.split('/').reverse().join('-') + "T" + nowTime,
    }
    this.loading = true;

    this.blogService.create(data).subscribe(
      dt => {
        // this.sendImg(dt)
        this.route.navigate(["/admin/blog/list"])
      },
      err => {
        this.loading = false;
      }
    )
  }

  sendImg(val) {
    // this.list_img_feature.forEach(item => {
    //   let data = {
    //     "product_id": val.id,
    //     "avatar_feature": item.data
    //   }
    //   this.prductService.createImgFeature(data).subscribe(
    //     dt => {
    //       this.loading = false;
    //       this.route.navigate(["/admin/product/list"])
    //     },
    //     err => {
    //       this.loading = false;
    //     }
    //   )
    // });
  }
  // End Logic Image
}