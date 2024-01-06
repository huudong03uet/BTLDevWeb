import { User } from './../../../models/user';
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
  isEditingTitle = false;
  isMenuOpen = false;

  userData: any = new UserDataService(this.myService);
  @ViewChild('projectTitleInput') projectTitleInput!: ElementRef;

  constructor(private router: Router, private userDataService: UserDataService,private myService: HostService,) { }

  ngOnInit(): void {
    console.log(this.data.data_source)
  }
  @Input() data: any;
  @Output() dataChange = new EventEmitter();

  startEditingTitle(): void {
    this.isEditingTitle = true;
    setTimeout(() => {
      this.projectTitleInput.nativeElement.focus();
    });
    this.dataChange.emit(this.data);
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

  stopEditingTitle(): void {
    this.isEditingTitle = false;
  }

  toggleSave(): void {
    // console.log("header", this.webCodeData)
    // post api to save the code /project/saveProject
    const url = this.myService.getApiHost() + `/project/saveProject`;
    console.log(this.data)
    axios.post(url, {
      data: this.data,
    })
      .then((response) => {
        console.log(response);
        alert("Saved Successfully")
      }, (error) => {
        console.log(error);
      });
  }



  

}
