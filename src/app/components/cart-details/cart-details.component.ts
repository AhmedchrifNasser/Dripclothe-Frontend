import { Component } from '@angular/core';
import {CartItem} from "../../models/cart-item";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent{
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  shippingFee: number = 0;
  totalQuantity: number = 0;
  constructor(private cartService: CartService,
              private router: Router) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.shippingFees.subscribe(
      data => this.shippingFee = data
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }

  removeCartItem(theCartItem: CartItem) {
    this.cartService.removeCartItem(theCartItem);
  }
  incrementQuantity(addedCartItem: CartItem) {
    this.cartService.addToCart(addedCartItem);
  }
  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    this.cartService.computeCartTotals();
  }
  NavigateToCheckout() {
    this.router.navigate(['/checkout'])
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
  }

}
