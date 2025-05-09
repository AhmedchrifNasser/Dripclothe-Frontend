import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Artiste} from "../models/artiste";
import {Coupon} from "../models/coupon";

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private baseUrl = environment.dripClotheUrl;
  constructor(private httpClient: HttpClient) { }

  public verifyCoupon(couponName: String):Observable<Coupon>{
    return this.httpClient.get<Coupon>(`${this.baseUrl}/coupon/find/${couponName}`);
  }

  public verifyCouponUsed(coupon: Coupon, email: string):Observable<any>{
    let params = new HttpParams()
      .set('id', coupon.id.toString())
      .set('value', coupon.value.toString())
      .set('name', coupon.name)
      .set('available', coupon.available.toString())
      .set('email', email);
    return this.httpClient.get<any>(`${this.baseUrl}/coupon/used`, { params});
  }

  public registerCoupon(coupon: Coupon, email: string):Observable<any>{
    const payload = {
      coupon: coupon,
      email: email
    };
    return this.httpClient.post(`${this.baseUrl}/coupon/register`, payload);
  }
}
