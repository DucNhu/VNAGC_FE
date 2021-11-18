import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute
      ) { }

  ngOnInit(): void {
    Promise.all(
      [
        this.getOrders()
      ]
    ).then(
      (dt: any) => {
        this.listOrder = dt[0].Data;
        this.load = false;
        console.log(dt[0].Data)
      },
      err => {
        this.load = false;
      }
    )
  }

  getOrders(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.orderService.getOrderByUser(this.activatedRoute.snapshot.paramMap.get("id")).toPromise();
      resolve(dt);
    });
  }
  OrderDetail = [];
  getOrderDetail(id) {
    this.OrderDetail = this.listOrder[id].items;
  }
}
