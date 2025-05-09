import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../services/cart.service";
import {CheckoutService} from "../../services/checkout.service";
import {Router} from "@angular/router";
import {Order} from "../../models/order";
import {OrderItem} from "../../models/order-item";
import {Purchase} from "../../models/purchase";
import {ShopValidators} from "../../validators/shop-validators";
import {StepperOrientation} from "@angular/cdk/stepper";
import {environment} from "../../../environments/environment.development";
import {PaymentInfo} from "../../models/payment-info";
import {PopupComponent} from "../popup/popup.component";
import {MatDialog} from "@angular/material/dialog";
import {Customer} from "../../models/customer";
import {Address} from "../../models/address";
import {Title} from "@angular/platform-browser";
import {Coupon} from "../../models/coupon";
import {CouponService} from "../../services/coupon.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orientation: StepperOrientation = 'horizontal';
  paymentFormGroup!: FormGroup;
  customerFormGroup!: FormGroup;
  shippingFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  shippingFee: number = 0;
  stripe: any;
  purchase = new Purchase();

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private couponService: CouponService,
              private checkoutService: CheckoutService,
              private router: Router,
              private dialogRef: MatDialog,
              private titleService: Title) {
  }

  get firstName() {
    return this.customerFormGroup.get('firstName');
  }

  get lastName() {
    return this.customerFormGroup.get('lastName');
  }

  get email() {
    return this.customerFormGroup.get('email');
  }

  get shippingAddressStreet() {
    return this.shippingFormGroup.get('street')
  }

  get shippingAddressCity() {
    return this.shippingFormGroup.get('city')
  }

  get shippingAddressCountry() {
    return this.shippingFormGroup.get('country')
  }

  get shippingAddressZipCode() {
    return this.shippingFormGroup.get('zipCode')
  }

  ngOnInit(): void {
    //this.setupStripPaymentForm();
    this.stripe = Stripe(environment.stripePublishableKey);
    this.titleService.setTitle("DripClothe - Checkout");
    this.reviewCartDetails();
    this.customerFormGroup = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required, Validators.minLength(3), ShopValidators.notOnlyWhiteSpace]),
      lastName: new FormControl("", [Validators.required, Validators.minLength(3), ShopValidators.notOnlyWhiteSpace]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,15}$')]
      )
    });
    this.shippingFormGroup = this.formBuilder.group({
      street: new FormControl("", [Validators.required, Validators.minLength(3), ShopValidators.notOnlyWhiteSpace]),
      city: new FormControl("", [Validators.required, Validators.minLength(3), ShopValidators.notOnlyWhiteSpace]),
      country: new FormControl("", [Validators.required]),
      zipCode: new FormControl("", [Validators.required, Validators.minLength(3), ShopValidators.notOnlyWhiteSpace]),
    });
    this.paymentFormGroup = this.formBuilder.group({});

    this.VerticalOrHorizontalStepper();
  }

  typoIncorrect = false;

  verifyCustomer() {
    if (this.customerFormGroup.invalid) {
      this.typoIncorrect = true;
      this.customerFormGroup.markAllAsTouched();
      return;
    }
    this.typoIncorrect = false;
    if (this.cartService.coupon.value != 0) {
      console.log(this.cartService.coupon)
      this.couponService.verifyCouponUsed(this.cartService.coupon, this.customerFormGroup.get('email')?.value).subscribe(
        (res) => {
          if (res) {
            this.openDialog(`You used this coupon ( ${this.cartService.coupon.name} ),the total price will go back to the original value `, false);
            this.cartService.SetCoupon(new Coupon());
            this.cartService.computeCartTotals();
          }
        }
      )
    }
  }

  verifyAddress() {
    if (this.shippingFormGroup.invalid) {
      this.typoIncorrect = true;
      this.shippingFormGroup.markAllAsTouched();
      return;
    }
    this.typoIncorrect = false;
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    order.shippingFee = this.shippingFee;

    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    this.purchase.customer = this.customerFormGroup.value;
    this.purchase.shippingAddress = this.shippingFormGroup.value;
    this.purchase.order = order;
    this.purchase.orderItems = orderItems;

    this.checkoutService.placeOrder(this.purchase).subscribe(
      {
        next: response => {
          this.purchase.order.orderTrackingNumber = response.orderTrackingNumber;
          this.setupStripPaymentForm(this.customerFormGroup.value, this.shippingFormGroup.value, response.orderTrackingNumber);
        },
        error: err => {
          this.openDialog(`There was an error: ${err.message}`, false)
        }
      }
    )
  }

  reviewCartDetails() {
    this.cartService.FinalTotalPrice.subscribe(
      totalPrice => {
        this.cartService.shippingFees.subscribe(
          (shippingfee) => {
            this.totalPrice = totalPrice + shippingfee;
            this.shippingFee = shippingfee;
          }
        )
      }
    );
  }

  checkout() {
    if (this.paymentFormGroup.invalid) {
      this.typoIncorrect = true;
      this.paymentFormGroup.markAllAsTouched();
      return;
    }

    if (!this.paymentFormGroup.invalid) {
      this.stripe.confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          // Make sure to change this to your payment completion page

        }, redirect: 'if_required',
      })
        .then((result: any) => {
          if (result.error) {
            //inform the customer there was an error
            alert(`There was an error: ${result.error.message}`);
          } else {
            if(this.cartService.coupon.value != 0) {
              this.couponService.registerCoupon(this.cartService.coupon, this.customerFormGroup.get('email')?.value).subscribe(
                {
                  next: response => {
                  },
                  error: err => {
                    //this.openDialog(`There was an error: ${err.message}`, false)
                  }
                }
              )
            }
            this.createReceipt(this.purchase);
            this.openDialog("Your purchase completed with success, your receipt is downloading in the mean time. \nYou will also receive all the receipts is your mail.", true)
            this.resetCart();
          }
        });
    } else {
      this.paymentFormGroup.markAllAsTouched();
      return;
    }
  }

  setupStripPaymentForm(customer: Customer, address: Address, orderNumber: String) {
    var elements = this.stripe.elements();
    let paymentInfo = new PaymentInfo(this.totalPrice * 100, "USD", customer, address, orderNumber,this.cartService.cartItems.map(tempCartItem => new OrderItem(tempCartItem)))
    this.checkoutService.createPaymentIntent(paymentInfo).subscribe(
      (paymentIntentResponse) => {
        console.log('paymentIntentResponse');
        console.log(paymentIntentResponse);
        elements = this.stripe.elements({clientSecret: paymentIntentResponse.token});
        //elements = this.stripe.elements({clientSecret: paymentIntentResponse.client_secret});
        this.paymentElement = elements.create("payment", this.paymentElementOptions);
        this.paymentElement.mount("#payment-element");
        this.paymentElement.elements = elements;

      }
    );
  }

  createReceipt(purchase: Purchase) {
    //let newVariable: any = window.navigator;
    this.checkoutService.createReceipt(purchase).subscribe(
      res => {
        const blob = new Blob([res.body], {type: 'application/pdf'});
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'receipt.pdf';
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      }
    )
  }

  openDialog(msg: string, success: boolean) {
    this.dialogRef.open(PopupComponent, {
      data: {
        message: msg,
        success: success
      }
    });
  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.checked.next(false);
    this.cartService.SetShippingFee(0);
    this.cartService.SetCoupon(new Coupon());
    this.cartService.persistCartItems();

    this.customerFormGroup.reset();
    this.shippingFormGroup.reset();
    this.paymentFormGroup.reset();

    this.router.navigate(['/']);

  }

  @HostListener('window:resize', ['$event'])
  VerticalOrHorizontalStepper() {
    if (window.innerWidth < 800)
      this.orientation = 'vertical';
  }

  paymentElement!: any;
  paymentElementOptions = {
    layout: "tabs",
  };
}
