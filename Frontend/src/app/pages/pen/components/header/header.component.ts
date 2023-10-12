import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


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

  public projectTitle: string = 'Untitled';  // Khởi tạo giá trị mặc định

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
  


  saveData() {
    this.saveDataParent.emit();
  }
}
