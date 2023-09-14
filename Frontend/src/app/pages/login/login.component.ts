import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginError: string | null = null;
  gmail: string = ''; // Thêm biến email và khởi tạo
  password: string = ''; // Thêm biến password và khởi tạo

  constructor(private router: Router) {}

  onLoginFormSubmit() {
    if (this.gmail && this.password) {
      // Người dùng đã điền đủ thông tin, có thể gọi API đăng nhập
      const apiUrl = 'http://localhost:3000/auth/login';
      const requestBody = {
        gmail: this.gmail,
        password: this.password
      };
  
      axios.post(apiUrl, requestBody)
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            // Xử lý khi đăng nhập thành công
            console.log('Đăng nhập thành công');
            // Chuyển hướng đến trang chủ
            this.router.navigate(['/']);
            alert('Đăng nhập thành công');
          } else {
            this.loginError = 'Đăng nhập thất bại! Sai tài khoản hoặc mật khẩu';
          }
        })
        .catch((error) => {
          console.log(12341);
          // Xử lý khi có lỗi
          console.error('Đã xảy ra lỗi:', error);
        });
    } else {
      // Người dùng chưa điền đủ thông tin, hiển thị cảnh báo
      this.loginError = 'Vui lòng điền đủ thông tin đăng nhập.';
    }
  }

  loginWithGoogle() {
    // Xử lý đăng nhập bằng Google
    // Thêm mã xử lý tại đây
  }

  loginWithGithub() {
    // Xử lý đăng nhập bằng Github
    // Thêm mã xử lý tại đây
  }

  loginWithFacebook() {
    // Xử lý đăng nhập bằng Facebook
    // Thêm mã xử lý tại đây
  }
}
