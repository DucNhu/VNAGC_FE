import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }
  checkAuthen=false;
  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.data)
  }

}
