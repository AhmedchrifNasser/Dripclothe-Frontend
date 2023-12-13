import {CartItem} from "./cart-item";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})

export class Permissions {
  canGoToRoute(cartItems: CartItem[]): boolean {
    return (cartItems.length != 0);
  }
}
