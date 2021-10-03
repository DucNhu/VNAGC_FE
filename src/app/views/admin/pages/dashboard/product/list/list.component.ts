import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/_service/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListProductComponent implements OnInit {
  listProduct: any = [];
  load = true;
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (dt: any) => {
        this.listProduct = dt;
        this.load = false;
      },
      err => {
        this.load = false;
      }
    )
  }

  deleteProduct(id) {
    if (confirm("a u ok?")) {
      this.productService.delete(id).subscribe(
        dt => {
          window.location.reload()
        },
        err => {
          this.load = false;
        }
      )
    }
  }
}
