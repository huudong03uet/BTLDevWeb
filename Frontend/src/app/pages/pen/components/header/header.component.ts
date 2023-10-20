import { Component, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { get } from 'lodash';
=======
>>>>>>> refs/remotes/origin/main
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'pen-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class PenHeaderComponent implements OnInit {
  @Output() saveDataParent = new EventEmitter<void>();
  @ViewChild('projectTitleInput') projectTitleInput!: ElementRef;


  public isMenuOpen = false;
  public projectTitle = 'Untitled';
  public isEditingTitle = false;
  public isLoggedIn = false;

  constructor(private router: Router, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.userDataService.getUserData();
  }

<<<<<<< HEAD
  public projectTitle: string = 'Untitled';  
=======
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openMenu(): void {
    this.isMenuOpen = true;
  }

>>>>>>> refs/remotes/origin/main
  closeMenu(): void {
    this.isMenuOpen = false;
  }

<<<<<<< HEAD
  constructor(
    private userData: UserDataService | null,
    private router: Router,
  ) { }

  onLoginButtonClick() {
=======
  onLoginButtonClick(): void {
>>>>>>> refs/remotes/origin/main
    this.router.navigate(['/login']);
  }

  onSigninButtonClick(): void {
    this.router.navigate(['/signin']);
  }

  startEditingTitle(): void {
    this.isEditingTitle = true;
    setTimeout(() => {
      this.projectTitleInput.nativeElement.focus();
    });
  }

<<<<<<< HEAD
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
=======
  stopEditingTitle(): void {
    this.isEditingTitle = false;
>>>>>>> refs/remotes/origin/main
  }

  saveData(): void {
    this.saveDataParent.emit();
  }
}
