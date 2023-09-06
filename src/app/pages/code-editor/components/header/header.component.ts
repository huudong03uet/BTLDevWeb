import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isMenuOpen: boolean = false;

  openMenu(): void {
    console.log("click");
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  constructor(private router: Router) { }

  onLoginButtonClick() {
    this.router.navigate(['/login']);
  }

  onSigninButtonClick() {
    this.router.navigate(['/signin']);
  }
}
