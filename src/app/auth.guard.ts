import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {Permissions} from "./models/permissions";
import {CartService} from "./services/cart.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cartService: CartService,
              private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const guardType = route.data['guard'];

    if (guardType === 'cart') {
      return this.canActivateForCartDetails();
    } else if (guardType === 'checkout') {
      return this.canActivateForCheckout();
    }

    return false;

  }

  private canActivateForCartDetails(): boolean {
    if (this.cartService.cartItems.length == 0) {
      this.router.navigate(['/']); // Redirect to home if not authenticated
      return false;
    }
    return true;
  }

  private canActivateForCheckout(): boolean {
    if(!this.cartService.checked.value){
      this.router.navigate(['/']); // Redirect to home if not authenticated
      return false;
    }
    return true;
  }

}
