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
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/core/_service/category/category.service';
import { HashtagService } from 'src/app/core/_service/hashtag/hashtag.service';
import { productContent } from 'src/app/models/listSale';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateBlogComponent implements OnInit {
  listCategory = [{id: 1, name: 'dc'}];
  time = { hour: 13, minute: 30 };
  selectedHastags: any[];
  hastags = [{ id: 1, name: 'dc' }];
  listUnit = productContent.listUnit;
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
  blogId = null;

  loading = false;
  isSuccess = false;
  c1 = false;
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private hashtagService: HashtagService
  ) { this.registerFormBlog(); }

  ngOnInit(): void {
    Promise.all(
      [
        this.getCategory(),
        this.getHashtag()
      ]
    ).then(
      (dt: any) => {
        console.log(dt[1])
        this.listCategory = dt[0].Data;
        this.hastags = dt[1].Data;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    )

  }

  getCategory(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.categoryService.getCategorys().toPromise();
      resolve(dt);
    });
  }

  getHashtag(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.hashtagService.getHashtags().toPromise();
      resolve(dt);
    });
  }

  registerFormBlog() {
    this.formBlog = this.fb.group(
      {
        name: [null, Validators.compose([
          Validators.required
        ])],
        category: [null, Validators.compose([
          Validators.required
        ])],
        hashTag: [null],
        cooking_time: [null],
        summary: [null],
        description: [null],
        url_video_utube: [null],

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
    if (this.listStep().length == 0) {
      return this.listStep().push(
        this.fb.group({
          name: [null, Validators.compose(
            [Validators.required]
          )],
          description: [null, Validators.compose(
            [Validators.required]
          )],
          avatar: ['']
        })
      )
    }
    for (let i = 0; i < this.listStep().length; i++) {
      const dt = this.listStep()[i].value;
      if ((dt.name == null || dt.name.trim() == '') ||
        dt.description == null || dt.name.trim() == '') {
        this.listStep()[i].patchValue({ name: '', description: '' })
        return
      }
      else {
        if (i == this.listStep().length - 1) {
          return this.listStep().push(
            this.fb.group({
              name: [null, Validators.compose(
                [Validators.required]
              )],
              description: [null, Validators.compose(
                [Validators.required]
              )],
              avatar: ['']
            })
          )
        }
      }
    }

  }
  removeStep(i) {
    return (this.formBlog.get('step') as FormArray).removeAt(i)
  }

  listMetarial = () => {
    return (this.formBlog.get('metarial') as FormArray).controls;
  }
  addMetarial() {
    if (this.listMetarial().length == 0) {
      return this.listMetarial().push(
        this.fb.group({
          name: [null, Validators.compose(
            [Validators.required]
          )],
          content: [null],
          unit: [null]
        })
      )
    }
    for (let i = 0; i < this.listMetarial().length; i++) {
      const dt = this.listMetarial()[i].value;
      if (dt.name == null || dt.name.trim() == '') {
        this.listMetarial()[i].patchValue({ name: '' })
        return
      }
      else {
        if (i == this.listMetarial().length - 1) {
          return this.listMetarial().push(
            this.fb.group({
              name: [null, Validators.compose(
                [Validators.required]
              )],
              content: [null],
              unit: [null]
            })
          )
        }
      }
    }

  }
  removeMetarial(i) {
    return (this.formBlog.get('metarial') as FormArray).removeAt(i)
  }

  listContent = () => {
    return (this.formBlog.get('content') as FormArray).controls;
  }
  addContent() {
    if (this.listContent().length == 0) {
      return this.listContent().push(
        this.fb.group({
          title: [null, Validators.compose(
            [Validators.required]
          )],
          avatar: [''],
          avatar_cover: [''],
          description: ['']
        })
      )
    }
    for (let i = 0; i < this.listContent().length; i++) {
      const dt = this.listContent()[i].value;
      if (dt.title == null || dt.title.trim() == '') {
        this.listContent()[i].patchValue({ title: '' })
        return
      }
      else {
        if (i == this.listContent().length - 1) {
          return this.listContent().push(
            this.fb.group({
              title: [null, Validators.compose(
                [Validators.required]
              )],
              avatar: [''],
              avatar_cover: [''],
              description: ['']
            })
          )
        }
      }
    }

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
  isAvatarCover = false;
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
      if (!this.isAvatarCover) {
        this.listContent()[this.indexOflist_img_feature].patchValue({ avatar: data })
      }
      else {
        if (this.listContent()[this.indexOflist_img_feature].get('avatar').value == '' ||
          this.listContent()[this.indexOflist_img_feature].get('avatar').value == null) {
          this.listContent()[this.indexOflist_img_feature].patchValue({ avatar: data })
        }
        else {
          this.listContent()[this.indexOflist_img_feature].patchValue({ avatar_cover: data })
        }
      }
    }
  }
  setValueAvatar(e) {
    let reader = e.target;
    this.avatar = 'data:image/png;base64,' + reader.result.substr(reader.result.indexOf(',') + 1);
  }
  setValueAvatarCover(e) {
    let reader = e.target;
    if (this.avatar == '' || this.avatar == null) {
      this.avatar = 'data:image/png;base64,' + reader.result.substr(reader.result.indexOf(',') + 1);
    }
    else {
      this.avatar_cover = 'data:image/png;base64,' + reader.result.substr(reader.result.indexOf(',') + 1);
    }
  }
  createBlog() {
    let form = this.formBlog;
    if (form.invalid || this.avatar == null || this.avatar == '') {
      if (this.avatar == null || this.avatar == '') {this.avatar='';}
      return
    }
    let nowDate = new Date();
    let nowTime = new Date().toLocaleTimeString();
    let data = {
      "name": form.get('name').value,
      "banner_img": this.avatar,
      "cover_img": this.avatar_cover,
      "cooking_time": form.get('cooking_time').value,
      "summary": form.get('summary').value,
      "description": form.get('description').value,
      "url_video_utube": form.get('url_video_utube').value,
      "view": 0,
      "status": 0,
      "user_id": '1',
      "category_id": 0,

      "create_at": nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate(),
      "update_at": nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate(),
    }
    console.log(data)
    // this.loading = true;
    // this.blogService.create(data).subscribe(
    //   dt => {
    //     this.loading = false;
    //     this.blogId = dt.id;
    //     this.createMetarial();
    //     this.createContent();
    //     this.createStep();
    //     setTimeout(() => {
    //       this.route.navigate(["/admin/blog/list"]);
    //     }, 1500);
    //   },
    //   err => {
    //     this.loading = false;
    //   }
    // )
  }

  createMetarial() {
    this.listMetarial().forEach(e => {
      console.log(e)
      let value = e.value;
      let data = {
        "title": value.name,
        "unit": value.unit,
        "mass": value.content,
        "order": 0,
        "blog_id": this.blogId
      }
      console.log(data)
      this.blogService.createMetarial(data).subscribe(
        dt => {
          this.loading = false;
        },
        err => {
          this.loading = false;
        }
      )
    })
  }

  createStep() {
    this.listStep().forEach(e => {
      let value = e.value;
      let data = {
        "name": value.name,
        "description": value.description,
        "banner_img": value.avatar,
        "order": 0,
        "blog_id": this.blogId
      }
      console.log(data)
      this.blogService.createStep(data).subscribe(
        dt => {
          this.loading = false;
        },
        err => {
          this.loading = false;
        }
      )
    })
  }

  createContent() {
    this.listContent().forEach(e => {
      let value = e.value;
      let data = {
        "name": value.title,
        "content": value.description,
        "banner_img": value.avatar,
        "banner_cover": value.avatar_cover,
        "blog_id": this.blogId
      }
      console.log(data)
      this.blogService.createContent(data).subscribe(
        dt => {
          this.loading = false;
        },
        err => {
          this.loading = false;
        }
      )
    })
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
