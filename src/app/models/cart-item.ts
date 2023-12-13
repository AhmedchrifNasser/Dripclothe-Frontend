import {Photo} from "./photo";
import {Product} from "./product";
import {Size} from "./size";
import {Color} from "./color";

export class CartItem {
  id: number;
  name: string;
  photoUrl: Photo;
  unitPrice: number;
  shippingFee: number;
  size: Size;
  color: Color;
  quantity: number;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.photoUrl = product.photos[0];
    this.unitPrice = product.price;
    this.shippingFee = product.shippingFee;
    this.size = product.sizes[0];
    this.color = product.colors[0];
    this.quantity = 1;
  }
}
