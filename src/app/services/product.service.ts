import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.dripClotheUrl;
  constructor(private httpClient: HttpClient) { }

  public getProductsByStyle(styleId: number):Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}/product/byStyle/${styleId}`);
  }
  public getProductById(productId: number):Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseUrl}/product/${productId}`);
  }
}
