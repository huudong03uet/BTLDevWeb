import { Component, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onLoginButtonClick(): void {
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

  stopEditingTitle(): void {
    this.isEditingTitle = false;
  }

  saveData(): void {
    this.saveDataParent.emit();
  }
}
