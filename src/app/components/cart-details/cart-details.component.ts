import {Component, HostListener, OnInit} from '@angular/core';
import {CartItem} from "../../models/cart-item";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopValidators} from "../../validators/shop-validators";
import {CouponService} from "../../services/coupon.service";
import {Coupon} from "../../models/coupon";
import {Title} from "@angular/platform-browser";
import {PopupComponent} from "../popup/popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit{
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  finalTotalPrice: number = 0;
  shippingFee: number = 0;
  totalQuantity: number = 0;
  showCouponValid : boolean = false;
  showCouponInvalid : boolean = false;
  couponFormGroup!: FormGroup;
  coupon!: Coupon;
  showPremuime = false;
  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private couponService: CouponService,
              private router: Router,
              private dialogRef : MatDialog,
              private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle("DripClothe - Cart details");
    //this.ActivateStanMeth();
    this.couponFormGroup = this.formBuilder.group({
      coupon: new FormControl(''),
    });
    this.listCartDetails();
    console.log("this.shippingFee")
    console.log(this.shippingFee)
  }
  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent): void {
    if (event.key === 'cartItems') {
      window.location.reload();
    }
  }
  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    console.log(this.cartItems)
    this.cartService.computeCartTotals();
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.shippingFees.subscribe(
      data => {
        this.shippingFee = data;
        this.showPremuime = (data!=0);
      }
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    this.cartService.FinalTotalPrice.subscribe(
      data => this.finalTotalPrice = data
    )

    if (this.shippingFee != 0){
      this.ActivatePremMeth()
    } else {
      this.ActivateStanMeth()
    }
    let storedCoupon = JSON.parse(localStorage.getItem('coupon')!);
    if (storedCoupon != null && storedCoupon.value != 0) {
      this.couponFormGroup.get('coupon')?.setValue(storedCoupon.name);
      this.showCouponValid = true;
      this.showCouponInvalid = false;
      (document.getElementById("coupon") as HTMLFormElement).style.height = "15%";
    }
  }

  removeCartItem(theCartItem: CartItem) {
    this.cartService.removeCartItem(theCartItem);
    if(this.cartService.cartItems.length == 0) {
      this.cartService.SetCoupon(new Coupon());
      this.cartService.SetShippingFee(0);
      this.cartService.checked.next(false);
      this.openDialog('Cart is empty, add item to your cart first !!',true);
      this.router.navigate(['/']);
    }
  }
  incrementQuantity(addedCartItem: CartItem) {
    this.cartService.addToCart(addedCartItem);
  }
  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    this.cartService.computeCartTotals();
  }
  openDialog(msg: string,success: boolean){
    this.dialogRef.open(PopupComponent,{
      data: {
        message : msg,
        success : success
      }
    });
  }
  NavigateToCheckout() {
    if (this.cartService.totalQuantity.value == 0 || this.cartService.totalPrice.value == 0) {
      this.openDialog('Cart is empty, add item to your cart first !!',true);
      this.router.navigate(['/']);
    } else {
      this.cartService.checked.next(true);
      this.router.navigate(['/checkout'])
        .then(nav => {
           // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
        });
    }
  }

  ActivateStanMeth(){
    let  borderStan =  document.getElementById("borderStan") as HTMLFormElement;
    if (borderStan != null){
      borderStan.style!.outline = "solid #4c2e71";
    }

    let borderPrem = document.getElementById("borderPrem") as HTMLFormElement
    if (borderPrem != null){
      borderPrem.style!.outline = "solid whitesmoke";
    }

    let circlePrem = document.getElementById("circlePrem") as HTMLFormElement
    if (circlePrem != null){
      circlePrem.style!.background = "whitesmoke";
    }

    let circleStan = document.getElementById("circleStan") as HTMLFormElement
    if (circleStan != null){
      circleStan.style!.background = "#380b6e";
    }

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.shippingFees.subscribe(
      data => this.shippingFee = data
    );
    if (this.shippingFee != 0){
      this.cartService.SetShippingFee(0);
      this.cartService.shippingFees.subscribe(
        data => this.shippingFee = data
      );
    }
  }

  ActivatePremMeth(){
    (document.getElementById("borderStan") as HTMLFormElement).style!.outline = "solid whitesmoke";
    (document.getElementById("borderPrem") as HTMLFormElement).style!.outline = "solid #4c2e71";
    (document.getElementById("circleStan") as HTMLFormElement).style!.background = "whitesmoke";
    (document.getElementById("circlePrem") as HTMLFormElement).style!.background = "#380b6e";
    this.cartService.SetShippingFee(12);
    this.cartService.shippingFees.subscribe(
      data => this.shippingFee = data
    );
  }

  VerifyCoupon(){
    this.couponService.verifyCoupon(this.couponFormGroup.get('coupon')?.value).subscribe(
      (res) => {
        this.coupon = res;
        if(this.coupon == null){
          this.showCouponValid = false;
          this.showCouponInvalid = true;
          return
        }
        if (this.coupon.available) {
          this.showCouponValid = true;
          this.showCouponInvalid = false;
          (document.getElementById("coupon") as HTMLFormElement).style.height = "15%";
          this.cartService.SetCoupon(this.coupon);
          this.cartService.computeCartTotals();
        } else {
          this.cartService.SetCoupon(new Coupon());
          this.showCouponInvalid = true;
          this.showCouponValid = false;
        }
      },
      error => {
        this.showCouponInvalid = true;
        this.showCouponValid = false;
      }
    )
  }

}
