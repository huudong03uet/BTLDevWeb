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


  changeSvg(isEnter: boolean) {
    const button = document.getElementById('follow-button-following');
    if (button) {
      if (isEnter) {
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="FollowButton-module_unfollowIcon-9G6hv" style="fill: black;width: 10px;
          margin-right: 3px;"><path d="M96.8 83.7 63.1 50l33.7-33.7c3.6-3.6 3.6-9.4 0-13.1s-9.5-3.6-13.1 0L50 36.9 16.3 3.2C12.7-.4 6.9-.4 3.2 3.2s-3.6 9.5 0 13.1L36.9 50 3.2 83.7c-3.6 3.6-3.6 9.4 0 13.1s9.5 3.6 13.1 0L50 63.1l33.7 33.7c3.6 3.6 9.4 3.6 13.1 0s3.6-9.5 0-13.1z"></path></svg>
          Unfollow
        `;
      } else {
        button.innerHTML = `
          <svg viewBox="0 0 100 100" class="FollowButton-module_statusIcon-U62Ef" style="fill: white;width: 10px;
          margin-right: 3px;" >
            <path d="M34.6 82.4c-2.3 0-4.6-.9-6.3-2.6L8.8 60.7c-3.5-3.5-3.6-9.2-.1-12.7s9.2-3.6 12.7-.1l13.1 12.9L78.3 17c3.5-3.5 9.2-3.5 12.7 0s3.5 9.2 0 12.7L40.9 79.8c-1.7 1.8-4 2.6-6.3 2.6z"></path>
          </svg>
          Following
        `;
      }
    }
  }
}
