import {CartItem} from "./cart-item";

export class OrderItem {
  id!: number;
  productId!: number;
  colorId!: number;
  sizeId!: number;
  price!: number;
  quantity: number;

  constructor(cartItem: CartItem) {
    this.productId = cartItem.id;
    this.colorId = cartItem.color.id;
    this.sizeId = cartItem.size.id;
    this.price = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
  }
}
