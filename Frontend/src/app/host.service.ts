import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostService {
  private apiHost: string = 'http://localhost:3000';
  // private apiHost: string = 'http://10.244.1.34:3000';
  private webHost: string = window.location.origin;
  // private webHost: string = "http://fall2324w3g5.int3306.freeddns.org";

  constructor() { }

  getApiHost(): string {
    return this.apiHost;
  }

  getWebHost(): string {
    return this.webHost;
  }
}
