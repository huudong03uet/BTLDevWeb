import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { User } from 'src/app/models/user';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  constructor(
    private router: Router,    
    private userData: UserDataService,
    ) {} // Inject Router vào constructor

  hiddenRegisterEmail: boolean = true;
  signupError: string | null = null;
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  getHiddenRegisterEmail() {
    return this.hiddenRegisterEmail;
  }

  changeStatusHiddenRegisterEmail() {
    this.hiddenRegisterEmail = !this.hiddenRegisterEmail;
    console.log(this.hiddenRegisterEmail)
  }
  
  // Hàm xử lý khi người dùng gửi biểu mẫu đăng ký qua email
  async signupWithEmail() {
    //kiểm tra xem có cái nào chưa được nhập không
    if(this.name === '' || this.username === '' || this.email === '' || this.password === '' ) {
      this.signupError = "Vui lòng nhập đủ thông tin.";
      return;
    }

    // Kiểm tra các yêu cầu cho mật khẩu
    if (!this.isPasswordValid(this.password)) {
      this.signupError = 'Mật khẩu của bạn không đáp ứng đủ yêu cầu.';
      return; // Ngừng xử lý nếu mật khẩu không đủ điều kiện
    }

    // Kiểm tra tính hợp lệ của email
    if (!this.isEmailValid(this.email)) {
      this.signupError = 'Email không tồn tại.';
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
      const response = await axios.post('http://localhost:3000/auth/signup', {full_name: this.name, user_name: this.username, gmail: this.email, password: this.password });

      if (response.status === 200) {
        if(response.data.code == 200) {
          console.log('Registration successful:', response.data);
          // Chuyển hướng người dùng đến trang chủ hoặc thực hiện hành động sau khi đăng ký thành công
          // Ví dụ: chuyển hướng đến trang chủ
          let user: User = {
            user_id: response.data.data.user_id,
            user_name: response.data.data.user_name,
            gmail: response.data.data.gmail,
            full_name: response.data.data.full_name,
          };
          this.userData.setUserData(user);
          this.router.navigate(['/']);
          alert('Đăng ký thành công');
        }
        else {
          this.signupError = response.data.error;
        }
      } else {
        console.error('Registration failed:', response.data);
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
