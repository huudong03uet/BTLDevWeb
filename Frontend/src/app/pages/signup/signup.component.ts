import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { User } from 'src/app/models/user';
import { UserDataService } from 'src/app/services/user-data.service';
import { HostService } from 'src/app/host.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  constructor(
    private router: Router,    
    private userData: UserDataService,
    private myService: HostService, 
    private toastr: ToastrService,
    ) {
      this.toastr.toastrConfig.positionClass = 'toast-top-center'; // Set toastr position
    }

  hiddenRegisterEmail: boolean = false;
  signupError: string | null = null;
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  getHiddenRegisterEmail() {
    return this.hiddenRegisterEmail;
  }

  changeStatusHiddenRegisterEmail() {
    this.hiddenRegisterEmail = false;
    this.router.navigate(['/login']);
  }
  
  async signupWithEmail() {
    //kiểm tra xem có cái nào chưa được nhập không
    if(this.name === '' || this.username === '' || this.email === '' || this.password === '' ) {
      this.signupError = "Please fill in all fields.";
      return;
    }

    // Kiểm tra các yêu cầu cho mật khẩu
    if (!this.isPasswordValid(this.password)) {
      this.signupError = 'Your password is not strong enough.';
      return; 
    }

    // Kiểm tra tính hợp lệ của email
    if (!this.isEmailValid(this.email)) {
      this.signupError = 'Please enter a valid email address.';
      return; // Ngừng xử lý nếu email không hợp lệ
    }

    // Tiếp tục với quá trình đăng ký nếu mọi thứ đều đúng
    const registrationData = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    try {
      const response = await axios.post(this.myService.getApiHost() + '/auth/signup', { full_name: this.name, user_name: this.username, gmail: this.email, password: this.password });

      if (response.status === 200) {
        if(response.data.code == 200) {
         
          let user: User = {
            user_id: response.data.data.user_id,
            user_name: response.data.data.user_name,
            gmail: response.data.data.gmail,
            full_name: response.data.data.full_name,
            isAdmin: response.data.data.isAdmin,
          };
          this.userData.setUserData(user);  
          this.router.navigate(['/']);
          localStorage.setItem('gmail', this.email);
          localStorage.setItem('password', this.password);
          this.toastr.success('Signed up successfully!');
        }
        else {
          this.signupError = response.data.error;
        }
      } else {
        this.toastr.error('Registration failed:', response.data);
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  }

  // Hàm kiểm tra mật khẩu theo yêu cầu
  isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&><)(^-_]).{8,100}$/;
    return passwordRegex.test(password);
  }

  // Hàm kiểm tra tính hợp lệ của email
  isEmailValid(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  

  loginWithGoogle() {}
  loginWithGithub() {}
  loginWithFacebook() {}
}
