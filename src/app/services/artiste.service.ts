import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Artiste} from "../models/artiste";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArtisteService {
  private baseUrl = environment.dripClotheUrl;
  constructor(private httpClient: HttpClient) { }

  public getArtistes():Observable<Artiste[]>{
    return this.httpClient.get<Artiste[]>(`${this.baseUrl}/artiste/all`);
  }
}
