import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { get } from 'lodash';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'pen-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class PenHeaderComponent {
  @Output() saveDataParent = new EventEmitter<void>();
  @ViewChild('projectTitleInput') projectTitleInput!: ElementRef;

  public isMenuOpen: boolean = false;

  openMenu(): void {
    console.log("click");
    this.isMenuOpen = true;
  }

  public projectTitle: string = 'Untitled';  
  closeMenu(): void {
    this.isMenuOpen = false;
  }

  constructor(
    private userData: UserDataService | null,
    private router: Router,
  ) { }

  onLoginButtonClick() {
    this.router.navigate(['/login']);
  }

  onSigninButtonClick() {
    this.router.navigate(['/signin']);
  }

  public isEditingTitle: boolean = false;

  startEditingTitle() {
    this.isEditingTitle = true;
    setTimeout(() => {
      this.projectTitleInput.nativeElement.focus();
    });
}
  
  stopEditingTitle() {
      this.isEditingTitle = false;
  }

  checkIsLogin() {
    if (localStorage.getItem('gmail') != null || localStorage.getItem('gmail') != undefined) 
    {
      return true;
    }
    return false;
  }

  public isLogin = this.checkIsLogin();
  
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
  
  hiddenSetting = true;
  changeStatusOption() {
    console.log(localStorage.getItem('gmail'));
    this.hiddenSetting = !this.hiddenSetting;
  }

  saveData() {
    this.saveDataParent.emit();
  }
}
