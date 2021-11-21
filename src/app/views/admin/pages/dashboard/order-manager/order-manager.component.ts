import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AddToCartService } from 'src/app/core/_service/addToCart/add-to-cart.service';
import { DashBoardService } from 'src/app/core/_service/admin/dashBoard.service';
import { OrderService } from 'src/app/core/_service/profile/order.service';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent implements OnInit {
  listOrder: any = [];
  load = true;
  active = 0;
  listMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12];
  status = 0;

  constructor(
    private dashBoardService: DashBoardService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    Promise.all(
      [
        this.getAllOrder()
      ]
    ).then(
      (dt: any) => {
        this.listOrder = dt[0].Data?.Items;
        this.listOrder.forEach(
          e => {
            e.user_detail.avatar = e.user_detail.avatar ? this.domSanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${e.user_detail.avatar}`) : 'assets/images/avatars/default-avatar.jpg';
          })
        this.load = false;
      },
      err => {
        this.load = false;
      }
    )
  }

  getAllOrder(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.dashBoardService.getAllOrder().toPromise();
      resolve(dt);
    });
  }

  reset() {
    this.load = true;
    Promise.all(
      [
        this.getAllOrder()
      ]
    ).then(
      (dt: any) => {
        this.status = 0;

        this.listOrder = dt[0].Data?.Items;
        this.load = false;
      },
      err => {
        this.load = false;
      }
    )
  }
  OrderDetail = [];
  getOrderDetail(id) {
    this.OrderDetail = this.listOrder[id].items;
    this.OrderDetail.forEach(
      e => {
        e.bannerImg = e.bannerImg ? this.domSanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${e.bannerImg}`) : 'assets/images/avatars/default-avatar.jpg';
      })
  }

  getOrderBlogByMonth(type) {
    this.load = true;
    let start = "01";
    let end = "12";
    switch (type) {
      case 1:
        start = "01";
        end = "03";
        this.active = 13;
        break;
      case 2:
        start = "04";
        end = "06";
        this.active = 22
        break;
      case 3:
        start = "07";
        end = "09";
        this.active = 33
        break;
      case 4:
        start = "10";
        end = "12";
        this.active = 44
        break;
      default:
        break;
    }
    this.dashBoardService.getOrderByMonth(start, end).subscribe(
      dt => {
        this.status = 1;
        this.load = false;
        this.OrderDetail = [];
        this.listOrder = dt;
        this.listOrder.forEach(
          e => {
            e.avatar = e.avatar ? this.domSanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${e.avatar}`) : 'assets/images/avatars/default-avatar.jpg';
          })
      }
    )
  }
  getOrderBlogInMonth(month) {
    this.load = true;
    this.active = month;
    this.dashBoardService.GetTopOrderInMonth(`2021-${month}-01`).subscribe(
      dt => {
        this.status = 1;

        this.load = false;
        this.OrderDetail = [];
        this.listOrder = dt;
        this.listOrder.forEach(
          e => {
            e.avatar = e.avatar ? this.domSanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${e.avatar}`) : 'assets/images/avatars/default-avatar.jpg';
          })
      }
    )
  }
}
