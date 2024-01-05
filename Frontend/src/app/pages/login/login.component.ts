import { User } from './../../models/user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { UserDataService } from 'src/app/services/user-data.service';
import { HostService } from 'src/app/host.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginError: string | null = null;
  gmail: string = '';
  password: string = ''; 


  constructor(
    private router: Router,
    private userData: UserDataService,
    private myService: HostService,
    private toastr: ToastrService
    ) {
      // set top center
      this.toastr.toastrConfig.positionClass = 'toast-top-center';
      // set height for toast = 10px




    }

  onLoginFormSubmit() {
    // console.log(123432)
    if (this.gmail && this.password) {
      const apiUrl = this.myService.getApiHost() + '/auth/login';
      const requestBody = {
        gmail: this.gmail,
        password: this.password
      };
  
      axios.post(apiUrl, requestBody)
        .then((response) => {
          // console.log(response.data);

          if (response.data.statusCode === 200) {
            // console.log('Đăng nhập thành công');
            // console.log(response.data.data)
            let user: User = {
              user_id: response.data.data.user_id,
              user_name: response.data.data.user_name,
              gmail: response.data.data.gmail,
              full_name: response.data.data.full_name,
              isAdmin: response.data.data.isAdmin,
            };
            this.userData.setUserData(user);
            this.router.navigate(['/']);
            localStorage.setItem('gmail', this.gmail);
            localStorage.setItem('password', this.password);
            // alert('Logged in successfully!');
            this.toastr.success('Login in successfully!', '');
          } else {
            this.loginError = 'Failed to login! Wrong username or password';
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          this.loginError = 'Failed to login! Wrong username or password';
        });
    } else {
      this.loginError = 'Please enter your username and password';
    }
  }

  loginWithGoogle() {
    //TODO
  }

  loginWithGithub() {
    //TODO
  }

  loginWithFacebook() {
    //TODO
  }


  forgotPassword: boolean = false;

  openForgotPassword() {
    this.forgotPassword = !this.forgotPassword;
  }

  forgotPass() {
    const apiUrl = this.myService.getApiHost() + `/send-email/forgotPassword?email=${this.gmail}`;

    axios.post(apiUrl)
        .then((response) => {
          alert('Send email successfully!');
        })
        .catch((error) => {
          console.error('Đã xảy ra lỗi:', error);
          this.loginError = 'Failed to login! Wrong username or password.';
        });
  }
}
