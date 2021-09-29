import { Component, OnInit } from '@angular/core';
// import SwiperCore, { Navigation, Thumbs } from "swiper";
// SwiperCore.use([Navigation, Thumbs]);
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  thumbsSwiper: any;
  constructor() { }

  ngOnInit(): void {
  }

}
