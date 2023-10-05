import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-nologin',
  templateUrl: './sidebar-nologin.component.html',
  styleUrls: ['./sidebar-nologin.component.scss']
})
export class SidebarNologinComponent {
  isPenOpen = false;

  constructor(private router: Router) {}

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
}
