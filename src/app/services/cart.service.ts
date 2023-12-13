import { Injectable } from '@angular/core';
import {CartItem} from "../models/cart-item";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() {
    let data = JSON.parse(this.storage.getItem('cartItems')!)
    if(data != null){
      this.cartItems = data;
      this.computeCartTotals();
    }
    this.totalPrice.subscribe((res)=> console.log(res));
  }

  cartItems: CartItem[] = [];

  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  shippingFees: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  storage: Storage = localStorage;


  addToCart(theCartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem = undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id

      existingCartItem = this.cartItems.find( tempCartItem => (tempCartItem.id === theCartItem.id) && (tempCartItem.size.id === theCartItem.size.id) && (tempCartItem.color.id === theCartItem.color.id));
      console.log('existingCartItem');
      console.log(existingCartItem);
      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem!.quantity++;
    }
    else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  removeCartItem(cartItem: CartItem){
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id == cartItem.id);
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }

  computeCartTotals() {

    let totalPriceValue: number = 0.0;
    let totalQuantityValue: number = 0;
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice ;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(Number(totalPriceValue.toFixed(2)));
    this.totalQuantity.next(totalQuantityValue);
    if(this.cartItems.length != 0)
      this.shippingFees.next(Number(this.cartItems[0].shippingFee.toFixed(2)))
    else
      this.shippingFees.next(0)

    // log cart data just for debugging purposes
    //this.logCartData(totalPriceValue, totalQuantityValue);

    //persist cart data
    this.persistCartItems();
    //this.logCartData(totalPriceValue,totalQuantityValue);
  }
  persistCartItems(){
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems))
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }
}
