import { Injectable, OnInit, importProvidersFrom } from '@angular/core';
import { User } from '../models/user';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: User | null = null;  // Khởi tạo userData với giá trị null
  constructor() {
    const token = localStorage.getItem("dataUser"); // token có thể là chuỗi hoặc null

    if (typeof token === 'string') {
      // token là chuỗi, bạn có thể sử dụng nó
      this.userData = JSON.parse(token);
    }
  }

  setUserData(data: User) {
    window.localStorage.setItem("dataUser", JSON.stringify(data));
    this.userData = data;
  }

  getUserData(): User | null {
    return this.userData;
  }
}
