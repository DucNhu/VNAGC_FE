import { Component, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/core/_service/addToCart/add-to-cart.service';
import { AuthenService } from 'src/app/core/_service/authen/authen.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin=false;
  user: user;
  countProduct=0;
  constructor(
    private authenSv: AuthenService,
    private addToCartService: AddToCartService
  ) { }

  ngOnInit(): void {
    this.authenSv.currentUserSubject.subscribe(
      dt => {
        if (dt) {
          this.isLogin = true;
          this.user = JSON.parse(localStorage.getItem("user"));
          console.log(this.user)
        }
        else {
          this.isLogin = false;
        }
      }
    )
    this.addToCartService.cartCurrent.subscribe(
      dt => {
        console.log(JSON.parse(localStorage.getItem("cart")))
        this.countProduct = JSON.parse(localStorage.getItem("cart")).length;
      }
    );
  }
  logout() {
    this.authenSv.logout()
  }

}
