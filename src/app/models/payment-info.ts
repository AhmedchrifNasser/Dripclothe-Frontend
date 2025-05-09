import {Customer} from "./customer";
import {Address} from "./address";
import {Order} from "./order";
import {OrderItem} from "./order-item";

export class PaymentInfo {

  constructor(amount: number, currency: string, customer: Customer, address: Address,orderNumber: String,orderItems: OrderItem[]) {
    this.amount = amount;
    this.currency = currency;
    this.customer = customer;
    this.address = address;
    this.orderNumber = orderNumber;
    this.orderItems = orderItems;
  }

  amount!: number;
  currency!: string;
  customer!: Customer;
  address!: Address;
  orderNumber!: String;
  orderItems!: OrderItem[];
}
