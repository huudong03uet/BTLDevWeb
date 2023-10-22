import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  template: `
    <a (click)="openCreateNewComponent()">New Collection</a>
    <app-create-new-collection *ngIf="childVisible" (close)="handleChildClose()"></app-create-new-collection>
  `
})
export class HeaderComponent {
  constructor(
    private userData: UserDataService | null,
    private router: Router,
    private dialog: MatDialog
  ) { }

  childVisible: boolean = false;

  openCreateNewComponent() {
    this.childVisible = !this.childVisible;
  }

  handleChildClose() {
    this.childVisible = false;
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
    this.router.navigate(['/your-work']);
  }

  clickFollowing() {
    this.router.navigate(['/following']);
  }

  clickTrending() {
    this.router.navigate(['/trending']);
  }

}
