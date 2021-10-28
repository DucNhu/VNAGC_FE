import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { product } from 'src/app/models/product';
import { HelperService } from 'src/app/_helpers/helper.service';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  listCart=[];
  constructor(private helperService: HelperService) { }
  cartCurrent = new BehaviorSubject<any>(localStorage.getItem("cart"));
  cartCurrentValue = this.cartCurrent.value;
  cartObservable = this.cartCurrent.asObservable();
  
  setCart(data) {
    if(data.quantity==0) {
      return
    }
    
    let cartCurrent = JSON.parse(localStorage.getItem('cart'));
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
    this.cartCurrent.next(this.listCart);
  }
  deleteCartByIdProduct(id) {
    let cartCurrent = JSON.parse(localStorage.getItem('cart'));
    
    if (cartCurrent) {
      for (let i = 0; i < cartCurrent.length; i++) {
        const e = cartCurrent[i];
        if (e.id == id) {
            cartCurrent.splice(i, 1);
            localStorage.setItem('cart', JSON.stringify(cartCurrent));
        }
      }
    }
    this.cartCurrent.next(cartCurrent);
    if(cartCurrent.length == 0) {
      localStorage.removeItem("cart")
    }
  }
  deleteCart() {
    localStorage.removeItem("cart");
    this.cartCurrent.next(null);
  }
  createCart(data) {
    return this.helperService.post("Cart/add-item", data)
  }
}
