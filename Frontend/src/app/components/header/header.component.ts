import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private userData: UserDataService | null,
    private router: Router,
  ) { }
  hiddenSetting = true;
  changeStatusOption() {
    this.hiddenSetting = !this.hiddenSetting;
  }

  logOut() {
    this.userData!.setUserData(null);
    this.router.navigate(['']);
    localStorage.removeItem('gmail');
    localStorage.removeItem('password');
  }

  clickPen() {
    this.router.navigate(['/pen']);
  }

  clickYourWork() {
    this.router.navigate(['/your-work']);
  }

  clickFollowing() {
    this.router.navigate(['/following']);
  }

  clickTrending() {
    this.router.navigate(['/trending']);
  }

}
