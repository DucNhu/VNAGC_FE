import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/_service/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe( 
      dt => {
        console.log(dt);
        
      }
    )
  }

}
