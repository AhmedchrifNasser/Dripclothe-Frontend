import {OrderTracker} from "./order-tracker";
import {OrderItem} from "./order-item";
import {Customer} from "./customer";
import {Address} from "./address";

export class Order {
  orderTrackingNumber!: string;
  totalQuantity!: number;
  totalPrice!: number;
  shippingFee!: number;
  orderTrackers!: OrderTracker[];
  orderItems!: OrderItem[];
  customer!: Customer;
  shippingAddress!: Address
}
