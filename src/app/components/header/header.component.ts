import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor(private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.updateCartStatus();

  }
  updateCartStatus() {
    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );
    console.log(this.cartService.cartItems)
    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  NavigateToCartDetails() {
    this.router.navigate(['/cartDetails'])
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
  }
}
