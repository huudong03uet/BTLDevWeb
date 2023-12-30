import { Injectable } from '@angular/core';
import { User } from '../models/user';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userData: User | null = null;

  constructor() {
    const token = localStorage.getItem('dataUser');

    if (typeof token === 'string') {
      this.userData = JSON.parse(token);
    }
  }

  setUserData(data: User | null) {
    window.localStorage.setItem('dataUser', JSON.stringify(data));
    this.userData = data;
  }

  getUserData(): User | null {
    return this.userData;
  }

  getUserInfoFromBackend(user_id: number): Promise<User> {
    return axios.get<User>(`http://localhost:3000/user/getInfoUser?user_id=${user_id}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching user information:', error);
        throw error;
      });
  }

  updateProfile(user_id: number, profileData: any): Promise<User> {
    return axios.post<User>(`http://localhost:3000/user/updateProfile/${user_id}`, profileData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error updating user profile:', error);
        throw error;
      });
  }
}
