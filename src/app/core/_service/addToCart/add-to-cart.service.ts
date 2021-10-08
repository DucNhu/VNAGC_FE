import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  listCart=[];
  constructor() { }
  // cartCurrent = new BehaviorSubject<any>(localStorage.getItem("cart"));
  // cartCurrentValue = this.cartCurrent.value;
  // cartObservable = this.cartCurrent.asObservable();
  getCart() {

  }
  setCart(data) {
    if(data.quantity==0) {
      return
    }
    // this.cartCurrent.next(data);
    let cartCurrent = JSON.parse(localStorage.getItem('cart'));
    console.log(cartCurrent)
    if (cartCurrent) {
      for (let i = 0; i < cartCurrent.length; i++) {
        const e = cartCurrent[i];
        
        if (e.id == data.id) {
          cartCurrent[i] = data;
          localStorage.setItem('cart', JSON.stringify(cartCurrent));
          break;
        }
        else {
          if (i == cartCurrent.length - 1) {
            cartCurrent.push(data);
            localStorage.setItem('cart', JSON.stringify(cartCurrent));
          }
        }
      }
      if (cartCurrent.length == 0) {
        this.listCart.push(data)
        localStorage.setItem('cart', JSON.stringify(this.listCart));
      }
    }
    else {
      this.listCart.push(data)
      localStorage.setItem('cart', JSON.stringify(this.listCart));
    }
  }
  deleteCartByIdProduct(id) {
    let cartCurrent = JSON.parse(localStorage.getItem('cart'));
    if(cartCurrent.length == 0) {
      console.log(cartCurrent.length)
      localStorage.removeItem("cart")
    }
    if (cartCurrent) {
      for (let i = 0; i < cartCurrent.length; i++) {
        const e = cartCurrent[i];
        console.log(i==cartCurrent.length - 1)
        if (e.id == id) {
            cartCurrent.splice(i, 1);
            localStorage.setItem('cart', JSON.stringify(cartCurrent));
        }
      }
    }
  }
}
