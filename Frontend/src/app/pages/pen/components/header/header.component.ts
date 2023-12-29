// Trong PenHeaderComponent class
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { HomeCodeComponent } from '../../home-code.component';
import axios from 'axios';

@Component({
  selector: 'pen-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class PenHeaderComponent implements OnInit {
  @Output() saveDataParent = new EventEmitter<void>();
  @Input() webCodeData: { html: string; js: string; css: string; pen_id: string; user_id: Number; name: string; } = {
    html: '',
    js: '',
    css: '',
    pen_id: '',
    user_id: 0,
    name: '',
  };
  @Input() owner : any;
  @ViewChild('projectTitleInput') projectTitleInput!: ElementRef;
  @ViewChild(HomeCodeComponent) homeCodeComponent!: HomeCodeComponent;

  htmlEditor!: any;
  stylesheetEditor!: any;
  jsEditor!: any;

  myPen!: any;

  public isMenuOpen = false;
  public projectTitle = 'Untitled';
  public isEditingTitle = false;
  public isLoggedIn = false;

  currentUser: any;
  isFollowing = false;

  constructor(private router: Router, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.userDataService.getUserData();
    this.currentUser = this.userDataService.getUserData();
    if (this.webCodeData.pen_id) {
      this.getProjectTitle();
    }
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
    this.webCodeData.name = this.projectTitle;
  }

  saveData(): void {
    // console.log("header", this.webCodeData)
  }

  toggleFavorite(): void {
    if (this.myPen && this.myPen.pen_id) {
      console.log('Toggle favorite', this.myPen);
    }
  }

  async toggleSave() {
    console.log("header", this.webCodeData)
    if (this.webCodeData.user_id == null) {
      this.router.navigate(['/login']);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/pen/createOrUpdatePen', {
        user_id: this.webCodeData.user_id, 
        pen_id: this.webCodeData.pen_id, 
        html_code: this.webCodeData.html, 
        css_code: this.webCodeData.css, 
        js_code: this.webCodeData.js, 
        name: this.projectTitle,
      });
      this.myPen = response.data.pen;

      if (this.myPen && this.myPen.name) {
        this.projectTitle = this.myPen.name;
      }
    } catch (error) {
      console.error('Error save pen:', error);
    }
  }

  async getProjectTitle() {
    try {
      const response = await axios.post('http://localhost:3000/pen/getPenById', { pen_id: this.webCodeData.pen_id });
      const pen = response.data.pen;
      if (pen && pen.name) {
        this.projectTitle = pen.name;
      }
    } catch (error) {
      console.error('Error getting pen title:', error);
    }
  }

  toggleFollow(): void {
    if (this.myPen && this.myPen.user && this.myPen.user.id) {
      console.log('Toggle follow user:', this.myPen.user.id);
      this.isFollowing = !this.isFollowing;
    }
  }
}
