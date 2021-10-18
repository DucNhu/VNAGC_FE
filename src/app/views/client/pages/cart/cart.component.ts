import { Component, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/core/_service/addToCart/add-to-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  listCart = [];
  constructor(
    private addToCartService: AddToCartService
  ) { }

  ngOnInit(): void {
    this.listCart = JSON.parse(localStorage.getItem('cart'));
    this.listCart.forEach(e => {
      e.totalAProduct = e.price * ((100 - e.sale)/100);
      e.subtotal = e.totalAProduct * e.quantity;
    });
  }

  setQuantity(index, quantity) { 
    this.listCart[index].subtotal = this.listCart[index].totalAProduct * quantity;
    this.listCart[index].quantity = quantity;
    this.addToCartService.setCart(this.listCart[index]);
  }
  deleteCartByIdProduct(id, i) {
    this.listCart.splice(i, 1)
    this.addToCartService.deleteCartByIdProduct(id)
  }

  total() {
    let total = 0;
    this.listCart.forEach(e => {
      total = e.subtotal + total;
    });
    return total
  }
}
