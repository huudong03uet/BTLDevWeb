import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isPenOpen = false;

  constructor(private router: Router) {}

  childVisible: boolean = false;
  childPinnedVisible: boolean = false;

  openCreateNewComponent() {
    this.childVisible = !this.childVisible;
  }

  handleChildClose() {
    this.childVisible = false;
  }

  openPinnedComponent() {
    this.childPinnedVisible = !this.childPinnedVisible;
  }
  handleChildPinnedClose() {
    this.childPinnedVisible = false;
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
