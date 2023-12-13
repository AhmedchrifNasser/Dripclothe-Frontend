import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Style} from "../models/style";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private baseUrl = environment.dripClotheUrl;
  constructor(private httpClient: HttpClient) { }

  public getStylesByArtiste(artisteId: number):Observable<Style[]>{
    return this.httpClient.get<Style[]>(`${this.baseUrl}/style/${artisteId}`);
  }
}
