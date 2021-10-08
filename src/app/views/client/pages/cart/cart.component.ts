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
  }

  setQuantity(index, quantity) {  
    this.listCart[index].quantity = quantity;
    this.addToCartService.setCart(this.listCart[index]);
  }
  deleteCartByIdProduct(id, i) {
    this.listCart.splice(i, 1)
    this.addToCartService.deleteCartByIdProduct(id)
  }

}
