import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';
import { HomeCodeComponent } from '../../pen/home-code.component';
import { HostService } from 'src/app/host.service';
@Component({
  selector: 'app-header-project',
  templateUrl: './header-project.component.html',
  styleUrls: ['./header-project.component.scss'],
})
export class HeaderProjectComponent implements OnInit {
  @Output() saveDataParent = new EventEmitter<void>();
  @Input() webCodeData: { html: string; js: string; css: string; pen_id: string; user_id: Number } = {
    html: '',
    js: '',
    css: '',
    pen_id: '',
    user_id: 0,
  };
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

  constructor(private router: Router, private userDataService: UserDataService,private myService: HostService,) { }

  ngOnInit(): void {
    // this.isLoggedIn = !!this.userDataService.getUserData();
  }

  toggleMenu(): void {
    // this.isMenuOpen = !this.isMenuOpen;
  }

  openMenu(): void {
    // this.isMenuOpen = true;
  }

  closeMenu(): void {
    // this.isMenuOpen = false;
  }

  onLoginButtonClick(): void {
    // this.router.navigate(['/login']);
  }

  onSigninButtonClick(): void {
    // this.router.navigate(['/signin']);
  }

  startEditingTitle(): void {
    // this.isEditingTitle = true;
    // setTimeout(() => {
    //   this.projectTitleInput.nativeElement.focus();
    // });
  }

  stopEditingTitle(): void {
    // this.isEditingTitle = false;
  }

  saveData(): void {
    // console.log("header", this.webCodeData)
  }

  async toggleSave() {
    // console.log("header", this.webCodeData)
    // if(this.webCodeData.user_id == null) {
    //   this.router.navigate(['/login']);
    //   return;
    // }
    // try {
    //   const response = await axios.post(this.myService.getApiHost() + '/pen/createOrUpdatePen', {
    //     user_id: this.webCodeData.user_id, 
    //     pen_id: this.webCodeData.pen_id, 
    //     html_code: this.webCodeData.html, 
    //     css_code: this.webCodeData.css, 
    //     js_code: this.webCodeData.js, 
    //     name: null
    //   });
    //   this.myPen = response.data.pen;
    // } catch (error) {
    //   console.error('Error save pen:', error);
    // }
  }
}
