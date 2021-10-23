import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/core/_service/payment/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  listCart = [];

  constructor(
    private roue: Router,
    private paymentService: PaymentService
    ) { }
  ngOnInit(): void {
    this.listCart = JSON.parse(localStorage.getItem('cart'));
    this.listCart.forEach(e => {
      e.totalAProduct = e.price * ((100 - e.sale) / 100);
      e.subtotal = e.totalAProduct * e.quantity;
    });

    paypal.Buttons(
      {
        style: {
          color: 'blue'
        }, createOrder: (data, actions) => {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: 1000
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          // This function captures the funds from the transaction.

          return actions.order.capture().then((details) => {
            // This function shows a transaction success message to your buyer.
            let order = {
              "quantity": 0,
              "payment_method": true,
              "total": this.total(),
              "returned": 0,
              "status": 0,
              "user_id": "string",
              "order_detail_id": 0,
              "delivery_date": "2021-10-21",
              "confirmation_date": "2021-10-21",
              "create_at": "2021-10-21",
              "update_at": "2021-10-21"
            }

            // localStorage.removeItem("cart")
            // this.roue.navigate(["/shop"])

            // this.paymentService.createPayment(order).subscribe(
            //   data => {
            //   }
            // );
            // this.userService.putUserUpgradePackageID(this.idUser, e.PackageID).subscribe(
            //   data => {
            //     alert(`Thank ${details.payer.name.given_name} for supporting the site, you have ${e.Duration} days free`);
            //     window.location.reload();
            //   }
            // );

          });
        }
        // })
      }
    ).render('#paypal-button-container');
  }
  total() {
    let total = 0;
    this.listCart.forEach(e => {
      total = e.subtotal + total;
    });
    return total
  }
}
