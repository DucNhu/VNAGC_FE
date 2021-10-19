import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
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
            let PackagePurchased = {
              // UserID: this.idUser,
              // Duration: e.Duration
            }

            // this.packagePP.CreatePackagePP(PackagePurchased).subscribe(
            //   data => {
            //   }
            // );
            // upgrade packadeID in User table
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

}
