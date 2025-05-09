import {Injectable} from '@angular/core';
import {CartItem} from "../models/cart-item";
import {BehaviorSubject} from "rxjs";
import {Coupon} from "../models/coupon";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() {
    let data = JSON.parse(this.storage.getItem('cartItems')!)
    if (data != null) {
      this.cartItems = data;

      let persCoupon = JSON.parse(this.storage.getItem('coupon')!)
      if (persCoupon != null){
        this.coupon = (persCoupon);
      }

      let persShippingFees = this.storage.getItem('shippingFees')
      if (persShippingFees != null){
        this.shippingFees.next(+persShippingFees);
      }

      let genderSelected = this.storage.getItem('gender')
      if (genderSelected != null){
        this.genderSelected = genderSelected;
      }else {
        this.SetGenderSelected("women");
        this.genderSelected ="women";
      }

      this.computeCartTotals();
    }
    this.totalPrice.subscribe();
  }

  cartItems: CartItem[] = [];
  coupon: Coupon = new Coupon();
    genderSelected !: string;
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  shippingFees: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  checked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  FinalTotalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  storage: Storage = localStorage;


  addToCart(theCartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(tempCartItem => (tempCartItem.id === theCartItem.id) && (tempCartItem.size.id === theCartItem.size.id) && (tempCartItem.color.id === theCartItem.color.id));
      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem!.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  removeCartItem(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id == cartItem.id);
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

  computeCartTotals() {

    let totalPriceValue: number = 0.0;
    let totalQuantityValue: number = 0;
    let totalShippingFee: number = 0;
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
      totalShippingFee += currentCartItem.shippingFee;
    }

    this.totalPrice.next(Number(totalPriceValue.toFixed(2)));
    if ((this.coupon.value != 0) && (this.coupon.value != undefined)){
      this.totalPrice.next(this.totalPrice.value - (this.totalPrice.value * this.coupon.value));
    }
    this.totalQuantity.next(totalQuantityValue);
    this.FinalTotalPrice.next(this.totalPrice.value + 2.0)
    this.shippingFees.next(totalShippingFee);
    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems))
  }

  SetShippingFee(shippingFee: number) {
    this.shippingFees.next(shippingFee);
    this.storage.setItem('shippingFees', this.shippingFees.value.toString())
  }
  SetFinalTotalPrice(finalTotalPrice: number) {
    this.FinalTotalPrice.next(finalTotalPrice);
  }
  SetCoupon(coupon: Coupon){
    this.coupon = coupon;
    if(coupon.value == 0) {
      this.storage.setItem('coupon', JSON.stringify(null));
    } else {
      this.storage.setItem('coupon', JSON.stringify(coupon));
    }
  }
  SetGenderSelected(gender: string){
    this.storage.setItem('gender', gender);
  }

}
