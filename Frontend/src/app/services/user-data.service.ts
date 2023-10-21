import { Injectable, OnInit, importProvidersFrom } from '@angular/core';
import { User } from '../models/user';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: User | null = null;  
  constructor() {
    const token = localStorage.getItem("dataUser"); 

    if (typeof token === 'string') {
      this.userData = JSON.parse(token);
    }
  }

  setUserData(data: User | null) {
    window.localStorage.setItem("dataUser", JSON.stringify(data));
    this.userData = data;
  }

  getUserData(): User | null {
    return this.userData;
  }
}
