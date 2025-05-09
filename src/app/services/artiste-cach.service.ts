import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {CachedData} from "../models/cached-data";

@Injectable({
  providedIn: 'root'
})
export class ArtisteCachService {

  private baseUrl = environment.dripClotheUrl;
  private cache: Map<string, Map<number, CachedData>> = new Map();

  constructor(private httpClient: HttpClient) { }


  getData(dataType: string, page: number, size: number, ttl = 60): Observable<any> {
    if (!this.cache.has(dataType)) {
      this.cache.set(dataType, new Map());
    }

    const pageCache = this.cache.get(dataType)!;
    const cachedEntry = pageCache.get(page);

    if (cachedEntry && !cachedEntry.isExpired()) {
      console.log(`Returning cached data for ${dataType} page ${page}`);
      return of(cachedEntry.data);
    }

    console.log(`Fetching fresh data for ${dataType} page ${page}`);
    return this.httpClient
      .get(`${this.baseUrl}/artiste/all?page=${page}&size=${size}`)
      .pipe(
        tap((data) => {
          console.log(`Caching data for ${dataType} page ${page}`);
          pageCache.set(page, new CachedData(data, ttl));
        })
      );
  }

  clearCache(dataType: string): void {
    this.cache.delete(dataType);
    console.log(`Cache cleared for ${dataType}`);
  }

  clearAllCache(): void {
    this.cache.clear();
    console.log('All caches cleared');
  }
}
