import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/core/_service/blog/blog.service';
import { ProductService } from 'src/app/core/_service/product.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
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
  blogId = null;

  loading = false;
  isSuccess = false;
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.registerFormBlog();
  }
  blockId = this.activatedRoute.snapshot.paramMap.get('id');

  ngOnInit(): void {
    Promise.all([
      this.getBlog(),
      this.getMetarial(),
      this.getContents(),
      this.getStep()
    ]).then(
      dt => {
        if (dt[0]) {
          this.setFormBlog(dt[0])
        }
        console.log(dt[1]);
        console.log(dt[2]);
        console.log(dt[3]);
      }
    )
  }

  setFormBlog(val) {
    console.log(val);
    this.formBlog.patchValue(
      {
        name: val.name,
        category: 'Tea',
        hashTag: [''],
        cooking_time: val.cooking_time,
        summary: val.summary,
        description: val.description,
        url_video_utube: val.cooking_time,
        metarial: val.cooking_time,
        step: val.cooking_time,
        content: [''],
        status: val.status
      }
    )
    this.avatar = val.banner_img;
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
        status: [false]
      }
    )
    this.addContent();
    this.addMetarial();
    this.addStep();
  }



  getBlog(): Promise<any> {
    return new Promise(
      async (resolve) => {
        const dt = this.blogService.getBlog(this.activatedRoute.snapshot.paramMap.get('id')).toPromise();
        return resolve(dt)
      }
    )

  }
  getMetarial(): Promise<any> {
    return new Promise(
      async (resolve) => {
        const dt = this.blogService.getMetarial(this.activatedRoute.snapshot.paramMap.get('id')).toPromise();
        return resolve(dt)
      }
    )
  }

  getContents(): Promise<any> {
    return new Promise(
      async (resolve) => {
        const dt = this.blogService.getContents(this.activatedRoute.snapshot.paramMap.get('id')).toPromise();
        return resolve(dt)
      }
    )
  }

  getStep(): Promise<any> {
    return new Promise(
      async (resolve) => {
        const dt = this.blogService.getStep(this.activatedRoute.snapshot.paramMap.get('id')).toPromise();
        return resolve(dt)
      }
    )
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
        description: ['']
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

      "create_at": nowDate.split('/').reverse().join('-') + "T" + nowTime,
      "update_at": nowDate.split('/').reverse().join('-') + "T" + nowTime,
    }
    this.loading = true;
    console.log(data)
    this.blogService.create(data).subscribe(
      dt => {
        this.loading = false;
        this.blogId = dt.id;
        this.createMetarial();
        this.createContent();
        this.createStep()
      },
      err => {
        this.loading = false;
      }
    )
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
