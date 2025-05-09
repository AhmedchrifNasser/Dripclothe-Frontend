import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Purchase} from "../models/purchase";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {PaymentInfo} from "../models/payment-info";
import {PurchaseResponse} from "../models/purchase-response";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = environment.dripClotheUrl;
  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<PurchaseResponse>(`${this.baseUrl}/checkout/purchase`,purchase);
  }

  /*createPaymentIntent(paymentInfo: PaymentInfo): Observable<any>{
    return this.httpClient.post<PaymentInfo>(`${this.baseUrl}/checkout/payment-intent`,paymentInfo);
  }*/

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any>{
    return this.httpClient.post<PaymentInfo>(`${this.baseUrl}/checkout/payment-intent`,paymentInfo);
  }

  createReceipt(purchase: Purchase): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': '*/*'});
    return this.httpClient.post<Blob>(`${this.baseUrl}/checkout/purchase/receipt`,purchase,{headers: headers,observe: 'response', responseType: 'blob' as 'json'})
  }
  fetchClient(): Observable<any>{
    return this.httpClient.get<string>(`${this.baseUrl}/checkout/payment/client`,{responseType: 'text' as 'json'});
  }
}
