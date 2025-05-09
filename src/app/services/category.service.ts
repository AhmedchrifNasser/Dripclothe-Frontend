import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.dripClotheUrl;

  constructor(private http: HttpClient) {}

  // Get all categories for dropdown selection
  getCategorieByName(categoryName:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories/all/${categoryName}`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories/all`);
  }

}
