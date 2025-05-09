import {CartItem} from "./cart-item";

export class OrderItem {
  id!: number;
  productId!: number;
  productName!: string;
  color!: string;
  size!: string;
  price!: number;
  quantity: number;
  photo!: string;

  constructor(cartItem: CartItem) {
    this.productId = cartItem.id;
    this.productName = cartItem.name;
    this.color = cartItem.color.name;
    this.size = cartItem.size.name;
    this.price = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
    this.photo = cartItem.photoUrl.photoUrl;
  }
}
