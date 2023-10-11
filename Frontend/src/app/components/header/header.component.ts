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
  ) {}
  hiddenSetting = false;
  changeStatusOption() {
    console.log(this.hiddenSetting)
    this.hiddenSetting = !this.hiddenSetting;
  }
  
  logOut() {
    this.userData!.setUserData(null);
    this.router.navigate(['']);
  }

}
