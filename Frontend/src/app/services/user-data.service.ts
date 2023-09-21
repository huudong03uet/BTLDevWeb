import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: User | null = null;  // Khởi tạo userData với giá trị null
  constructor() { }

  setUserData(data: User) {
    this.userData = data;
  }

  getUserData(): User | null {
    return this.userData;
  }
}
