import {Customer} from "./customer";
import {Address} from "./address";

export class PaymentInfo {

  constructor(amount: number, currency: string, customer: Customer, address: Address) {
    this.amount = amount;
    this.currency = currency;
    this.customer = customer;
    this.address = address;
  }

  amount!: number;
  currency!: string;
  customer!: Customer;
  address!: Address;
}
