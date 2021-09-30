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
  formBlog:FormGroup;
  isCollapsed = {
    metarial: false,
    step: false,
    content: false
  };
  constructor(
    private fb: FormBuilder
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
        summary: [''],
        description: [''],
        metarial: this.fb.array([]),
        step: this.fb.array([]),
        content: this.fb.array([])
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
        )]
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
    console.log(this.selectedHastags); // selectedHastags is still undefined
  }

  deselectAll(select: MatSelect) {
    this.selectedHastags = [];
    select.value = [];
  }
}
