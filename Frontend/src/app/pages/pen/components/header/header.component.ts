import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'pen-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class PenHeaderComponent {
  @Output() saveDataParent = new EventEmitter<void>();

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

  saveData() {
    this.saveDataParent.emit();

  }
}
