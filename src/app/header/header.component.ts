import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  onLoginButtonClick() {
    this.router.navigate(['/login']);
  }

  onSigninButtonClick() {
    this.router.navigate(['/signin']);
  }
}
