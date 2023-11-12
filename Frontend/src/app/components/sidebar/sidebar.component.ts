import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  template: `
  <a (click)="openCreateNewComponent()">New Collection</a>
  <app-create-new-collection *ngIf="childVisible" (close)="handleChildClose()"></app-create-new-collection>
`
})
export class SidebarComponent {
  isPenOpen = false;

  constructor(private router: Router) {}

  childVisible: boolean = false;

  openCreateNewComponent() {
    this.childVisible = !this.childVisible;
  }

  handleChildClose() {
    this.childVisible = false;
  }



  toggle() {
    this.isPenOpen = !this.isPenOpen;
  }

  clickPen() {
    this.router.navigate(['/pen']);
  }

  clickVuePen() {
    this.router.navigate(['/vue']);
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
