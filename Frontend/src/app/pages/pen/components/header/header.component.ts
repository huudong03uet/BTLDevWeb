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
  user: any;
  constructor(private router: Router, 
    private userData: UserDataService) { 
      this.user = this.userData.getUserData();
    }

  @Input() data: any;
  @Output() dataChange = new EventEmitter();
  @Output() saveData = new EventEmitter()
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

  isFollowing = false;


  ngOnInit(): void { 
    this.projectTitle = this.data.pen.name ? this.data.pen.name : 'Untitled';
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

 

  toggleFavorite(): void {
    if (this.myPen && this.myPen.pen_id) {
      console.log('Toggle favorite', this.myPen);
    }
  }

  async toggleSave() {
    this.data.pen.name = this.projectTitle;
    this.dataChange.emit(this.data);
    this.saveData.emit();
  }

  toggleFollow(): void {
    if (this.myPen && this.myPen.user && this.myPen.user.id) {
      console.log('Toggle follow user:', this.myPen.user.id);
      this.isFollowing = !this.isFollowing;
    }
  }
  handleLikeClick() {
    if(this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    }
    const url = `http://localhost:3000/grid/handleLike?pen_id=${this.data.pen.pen_id}&user_id=${this.userData.getUserData()?.user_id}&type=pen`;

    axios.get(url)
        .then((response) => {    
            this.data.liked = response.data.liked;
        })
        .catch((error) => {
            console.error('Error:', error);

            // Nếu xảy ra lỗi, đảm bảo đồng bộ lại giá trị 'liked' và 'like'
            this.data.liked = this.data.liked;
        });
  }

  handlePinClick() {
    if(this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    }
    const url = `http://localhost:3000/grid/handlePin?pen_id=${this.data.pen.pen_id}&user_id=${this.userData.getUserData()?.user_id}&type=pen`;

    axios.get(url)
        .then((response) => {
            this.data.pined = response.data.pinned;
          })
        .catch((error) => {
            console.error('Error:', error);
        });

  }

  handleFollowClick() {
    if(this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    } else {
      const url = `http://localhost:3000/grid/handleFollow?user_id_1=${this.userData.getUserData()?.user_id}&user_id_2=${this.data.user.user_id}`;

      axios.get(url)
          .then((response) => {
              this.data.followed = response.data.followed;
            })
          .catch((error) => {
              console.error('Error:', error);
          });  
    }
  }
}
