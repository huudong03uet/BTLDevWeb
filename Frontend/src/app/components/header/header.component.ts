import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})
export class HeaderComponent {
  isAdmin: boolean = this.userData?.getUserData()?.isAdmin || false;

  constructor(
    private userData: UserDataService | null,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.isAdmin = this.userData?.getUserData()?.isAdmin || false;

    console.log(this.isAdmin)
   }

  childVisible: boolean = false;

  childPinnedVisible: boolean = false;

  childProjectVisible: boolean = false;

  

  openCreateNewComponent() {
    this.childVisible = !this.childVisible;
  }

  openPinnedComponent() {
    this.childPinnedVisible = !this.childPinnedVisible;
  }

  
  openCreateNewProject() {
    this.childProjectVisible = !this.childProjectVisible;
  }


  handleChildClose() {
    this.childVisible = false;
  }

  handleChildPinnedClose() {
    this.childPinnedVisible = false;
  }

  handleChildProjectClose() {
    this.childProjectVisible = false;
  }


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
    this.router.navigate(['/your-work/pens']);
  }

  clickFollowing() {
    this.router.navigate(['/following']);
  }

  clickTrending() {
    this.router.navigate(['/trending']);
  }




}
// template: `
// <a (click)="openCreateNewComponent()">New Collection</a>
// <app-create-new-collection *ngIf="childVisible" (close)="handleChildClose()"></app-create-new-collection>,
// `