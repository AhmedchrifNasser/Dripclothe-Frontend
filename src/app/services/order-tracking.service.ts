import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderTrackingService {

  private baseUrl = environment.dripClotheUrl;
  constructor(private httpClient: HttpClient) { }

  getOrderStatus(findOrderById: string):Observable<Order> {
    return this.httpClient.get<Order>(`${this.baseUrl}/orders/${findOrderById}`);
  }
}
