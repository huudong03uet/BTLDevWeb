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

  setUserDataUsername(username: string) {
    console.log(username);
    if (this.userData) {
      this.userData.user_name = username;
      this.setUserData(this.userData);
    }
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

  // Add the following methods to your UserDataService class

  updateUsername(user_id: number, newUsername: string): Promise<any> {
    return axios.post<any>(`http://localhost:3000/user/changeUsername/${user_id}`, { newUsername })
      .then(response => response.data)
      .catch(error => {
        console.error('Error changing username:', error);
        throw error;
      });
  }

  updatePassword(user_id: number, currentPassword: string, newPassword: string): Promise<any> {
    return axios.post<any>(`http://localhost:3000/auth/updatePassword/${user_id}`, { currentPassword, newPassword })
      .then(response => response.data)
      .catch(error => {
        console.error('Error updating password:', error);
        throw error;
      });
  }

  updateEmail(user_id: number, newEmail: string): Promise<any> {
    return axios.post<any>(`http://localhost:3000/user/changeEmail/${user_id}`, { newEmail })
      .then(response => response.data)
      .catch(error => {
        console.error('Error changing email:', error);
        throw error;
      });
  }

  deleteAccount(user_id: number): Promise<any> {
    return axios.delete<any>(`http://localhost:3000/user/deleteUser/${user_id}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error deleting account:', error);
        throw error;
      });
  }  
}