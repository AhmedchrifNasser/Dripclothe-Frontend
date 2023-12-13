import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Photo} from "../models/photo";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private baseUrl = environment.dripClotheUrl;
  constructor(private httpClient: HttpClient) { }

  public getPhotosByProductId(productId: number):Observable<Photo[]>{
    return this.httpClient.get<Photo[]>(`${this.baseUrl}/product/photo/${productId}`);
  }
}
