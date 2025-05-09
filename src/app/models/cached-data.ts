export class CachedData {
  data: any;
  expiration: number;

  constructor(data: any, ttlInSeconds: number) {
    this.data = data;
    this.expiration = Date.now() + ttlInSeconds * 1000;
  }

  isExpired(): boolean {
    return Date.now() > this.expiration;
  }
}
