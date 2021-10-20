import { Component, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/core/_service/addToCart/add-to-cart.service';
import { OrderService } from 'src/app/core/_service/profile/order.service';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent implements OnInit {
  listOrder: any = [];
  load = true;
  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    Promise.all(
      [
        this.getProduct()
      ]
    ).then(
      (dt: any) => {
        this.listOrder = dt.Data;
        console.log(dt, this.listOrder)

        this.load = false;
      },
      err => {
        this.load = false;
      }
    )
  }

  getProduct(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.orderService.getOrders().toPromise();
      resolve(dt);
    });
  }
}
