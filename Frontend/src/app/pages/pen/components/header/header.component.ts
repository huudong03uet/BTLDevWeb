import { Component, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { HomeCenterComponent } from 'src/app/pages/home/components/home-center/home-center.component';
import { HomeCodeComponent } from '../../home-code.component';

@Component({
  selector: 'pen-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class PenHeaderComponent implements OnInit, AfterViewInit{
  @Output() saveDataParent = new EventEmitter<void>();
  @ViewChild('projectTitleInput') projectTitleInput!: ElementRef;
  @ViewChild(HomeCodeComponent) homeCodeComponent!: HomeCodeComponent;

  htmlEditor!: any;
  stylesheetEditor!: any;
  jsEditor!: any;

  public isMenuOpen = false;
  public projectTitle = 'Untitled';
  public isEditingTitle = false;
  public isLoggedIn = false;

  constructor(private router: Router, private userDataService: UserDataService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const { projectTitle, htmlCode, stylesheetCode, jsCode } = this.homeCodeComponent.getDataHome();
      this.projectTitle = projectTitle;
      console.log(htmlCode, stylesheetCode, jsCode);
    });
  }

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
    console.log('111111')
    let x = this.homeCodeComponent.getDataHome()
    console.log('111111', x);
  }
}
