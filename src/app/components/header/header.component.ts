import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../popup/popup.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor(private cartService: CartService,
              private dialogRef : MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.updateCartStatus();

  }

  openDialog(msg: string,success: boolean){
    this.dialogRef.open(PopupComponent,{
      data: {
        message : msg,
        success : success
      }
    });
  }
  updateCartStatus() {
    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  NavigateToCartDetails() {
    if (this.cartService.totalQuantity.value == 0 || this.cartService.totalPrice.value == 0) {
      this.openDialog('Cart is empty, add item to your cart first !!',true);
    } else {
      this.router.navigate(['/cartDetails'])
        .then(nav => {
           // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
        });
    }
  }
  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
