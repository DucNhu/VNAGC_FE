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
  unitTimeCook="mins";
  hastags: any[] = [
    { id: 1, viewValue: "material saving" },
    { id: 2, viewValue: "easy" },
    { id: 3, viewValue: "fast" },
    { id: 4, viewValue: "sweet things" },
    { id: 5, viewValue: "Appetizer" }
  ];
  listUnit = ["gam", "liter", "ml", "bottle"]
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

  loading = true;
  isSuccess = false;
  checkUpdateSuccess = false;
  // userID = localStorage.getItem("")
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.registerFormBlog();
  }
  blogId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    Promise.all([
      this.getBlog(),
      this.getMetarial(),
      this.getContents(),
      this.getStep()
    ]).then(
      dt => {
        this.loading = false;
        this.setFormBlog(dt[0])

        this.setFormMetarial(dt[1])
        this.setFormContent(dt[2])
        this.setFormSteps(dt[3])
      }
    )
  }


  createBlog() {
    let form = this.formBlog;
    let nowDate = new Date();
    let nowTime = new Date().toLocaleTimeString();
    let data = {
      "id": this.blogId,
      "name": form.get('name').value,
      "banner_img": this.avatar,
      "cover_img": this.avatar_cover,
      "cooking_time": form.get('cooking_time').value + form.get('unitTimeCook').value,
      "summary": form.get('summary').value,
      "description": form.get('description').value,
      "url_video_utube": form.get('url_video_utube').value,
      "view": 0,
      "status": form.get('status').value ? 1 : 0,
      "user_id": '1',
      "category_id": 0,

      "create_at": nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate() + "T" + nowTime,
      "update_at": nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate() + "T" + nowTime,
    }

    console.log(data)
    // this.loading = true;
    // this.blogService.update(data).subscribe(
    //   dt => {
    //     setTimeout(() => {
    //       this.checkUpdateSuccess = false;
    //       window.location.reload()
    //     }, 1500);
    //     this.createMetarial();
    //     this.createContent();
    //     this.createStep()
    //   },
    //   err => {
    //     this.loading = false;
    //   }
    // )
  }

  setFormContent(val) {
    console.log(val)
    val.forEach(e => {
      this.listContent().push(
        this.fb.group({
          id: [e.id, Validators.compose(
            [Validators.required]
          )],
          title: [e.name, Validators.compose(
            [Validators.required]
          )],
          avatar: [e.banner_img],
          avatar_cover: [e.banner_cover],
          description: [e.content]
        })
      )
    });
  }

  setFormSteps(val) {
    val.forEach(e => {
      this.listStep().push(
        this.fb.group({
          id: [e.id, Validators.compose(
            [Validators.required]
          )],
          name: [e.name, Validators.compose(
            [Validators.required]
          )],
          description: [e.desciption, Validators.compose(
            [Validators.required]
          )],
          avatar: [e.banner_img, Validators.compose(
            [Validators.required]
          )]
        })
      )
    });
  }

  setFormMetarial(val) {
    val.forEach(e => {
      this.listMetarial().push(
        this.fb.group({
          id: [e.id, Validators.compose(
            [Validators.required]
          )],
          name: [e.title, Validators.compose(
            [Validators.required]
          )],
          content: [e.mass, Validators.compose(
            [Validators.required]
          )],
          unit: [e.unit, Validators.compose(
            [Validators.required]
          )]
        })
      )
    });
  }

  setFormBlog(val) {
    this.formBlog.patchValue(
      {
        name: val.name,
        category: 'Tea',
        hashTag: '',
        cooking_time: val.cooking_time,
        summary: val.summary,
        description: val.description,
        url_video_utube: val.cooking_time,
        // metarial: val.cooking_time,
        // step: val.cooking_time,
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
        status: [false],
        unitTimeCook: ["mins"],

        metarial: this.fb.array([]),
        step: this.fb.array([]),
        content: this.fb.array([])
      }
    )
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
        id: [0, Validators.compose(
          [Validators.required]
        )],
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
    console.log(i)
    if (i.id != 0) {
      this.loading = true;
      this.blogService.deleteStep(i.id).subscribe(
        dt => {
          this.loading = false;
         return (this.formBlog.get('step') as FormArray).removeAt(i)
        },
        err => {
          this.loading = false;
          return false
        }
      )
    }
    else {
     return (this.formBlog.get('step') as FormArray).removeAt(i)
    }
    
  }

  listMetarial = () => {
    return (this.formBlog.get('metarial') as FormArray).controls;
  }
  addMetarial() {
    return this.listMetarial().push(
      this.fb.group({
        id: [0, Validators.compose(
          [Validators.required]
        )],
        name: ['', Validators.compose(
          [Validators.required]
        )],
        content: [0, Validators.compose(
          [Validators.required]
        )],
        unit: ['', Validators.compose(
          [Validators.required]
        )]
      })
    )
  }
  removeMetarial(i) {
    if (i.id != 0) {
      this.loading = true;
      this.blogService.deleteMetarial(i.id).subscribe(
        dt => {
          this.loading = false;
          return (this.formBlog.get('metarial') as FormArray).removeAt(i)
        },
        err => {
          this.loading = false;
          return false
        }
      )
    }
    else {
      return (this.formBlog.get('metarial') as FormArray).removeAt(i)
    }
  }

  listContent = () => {
    return (this.formBlog.get('content') as FormArray).controls;
  }
  addContent() {
    return this.listContent().push(
      this.fb.group({
        id: [0, Validators.compose(
          [Validators.required]
        )],
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
    console.log(i)
    if (i.id != 0) {
      this.loading = true;
      this.blogService.deleteStep(i.id).subscribe(
        dt => {
          this.loading = false;
          return (this.formBlog.get('content') as FormArray).removeAt(i)
        },
        err => {
          this.loading = false;
          return false
        }
      )
    }
    else {
      return (this.formBlog.get('content') as FormArray).removeAt(i)
    }
    
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

  createMetarial() {
    this.listMetarial().forEach(e => {
      let value = e.value;
      let data = {
        "id": value.id,
        "title": value.name,
        "unit": value.unit,
        "mass": value.content,
        "order": 0,
        "blog_id": this.blogId
      }

      if (value.id != 0) {
        this.updatMetarial(data)
      }
      else {
        this.blogService.createMetarial(data).subscribe(
          dt => {
            // this.loading = false;
            console.log(dt)
          },
          err => {
            // this.loading = false;
          }
        )
      }
    })
  }

  createStep() {
    this.listStep().forEach(e => {
      let value = e.value;
      let data = {
        "id": value.id,
        "name": value.name,
        "description": value.description,
        "banner_img": value.avatar,
        "order": 0,
        "blog_id": this.blogId
      }
      if (value.id != 0) {
        this.updateStep(data)
      }
      else {
        this.blogService.createStep(data).subscribe(
          dt => {
            console.log(dt)
          },
          err => {
          }
        )
      }
    })
  }

  createContent() {
    this.listContent().forEach(e => {
      let value = e.value;
      let data = {
        "id": value.id,
        "name": value.title,
        "content": value.description,
        "banner_img": value.avatar,
        "banner_cover": value.avatar_cover,
        "blog_id": this.blogId
      }
      console.log(data)
      if (value.id != 0) {
        this.updateContent(data)
      }
      else {
        this.blogService.createContent(data).subscribe(
          dt => {
            console.log(dt)
          },
          err => {
          }
        )
      }

    })
  }


  updatMetarial(data) {
    this.blogService.updateMetarial(data).subscribe(
      dt => {
        console.log(dt)
      },
      err => {
      }
    )
  }
  updateContent(data) {
    this.blogService.updateContent(data).subscribe(
      dt => {
        console.log(dt)
      },
      err => {
      }
    )
  }
  updateStep(data) {
    this.blogService.updateStep(data).subscribe(
      dt => {
        // this.loading = false;

      },
      err => {
      }
    )
  }

  // End Logic Image
}
