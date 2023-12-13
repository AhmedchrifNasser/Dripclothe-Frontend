import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../models/review";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = environment.dripClotheUrl;
  constructor(private httpClient: HttpClient) { }

  public getReviews():Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${this.baseUrl}/review/all`);
  }

  public addReview(review: Review): Observable<any> {
    return this.httpClient.post<Review>(`${this.baseUrl}/review/add`,review);
  }
}
