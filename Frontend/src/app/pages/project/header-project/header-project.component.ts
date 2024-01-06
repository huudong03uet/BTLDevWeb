import { User } from './../../../models/user';
import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';
import { HomeCodeComponent } from '../../pen/home-code.component';
import { HostService } from 'src/app/host.service';
import { ToastrService } from 'ngx-toastr';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-header-project',
  templateUrl: './header-project.component.html',
  styleUrls: ['./header-project.component.scss'],
})
export class HeaderProjectComponent implements OnInit {
  isEditingTitle = false;
  isMenuOpen = false;
  user: any;
  projectInfo: any;
  followed: boolean = false;
  liked: boolean = false;

  userData: any = new UserDataService(this.myService);
  @ViewChild('projectTitleInput') projectTitleInput!: ElementRef;

  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private myService: HostService,
    private clipboard: Clipboard,
    private toastr: ToastrService
  ) {
    this.toastr.toastrConfig.positionClass = 'toast-top-center'; // Set toastr position
  }

  async ngOnInit(): Promise<void> {
    this.user = this.userData?.getUserData();
    const projectId = this.data?.data_source?.project?.project_id;
  
    if (projectId) {
      const url = this.myService.getApiHost() + `/project/getInfoProjectByID?project_id=${projectId}`;
      try {
        const response = await axios.post(url);
        this.projectInfo = response.data.project;
  
        if (!this.user) {
          return;
        }
  
        if (this.projectInfo.status === 'private' && this.user.user_id !== this.projectInfo.user.user_id) {
          this.router.navigate(['/**']);
        }
      } catch (error) {
        console.log('Error fetching projectInfo:', error);
      }
    }
  
    console.log(this.user);
    if (this.user) {
      const isFollowingUrl = this.myService.getApiHost() + `/grid/isUser1FollowingUser2?user_id_1=${this.user?.user_id}&user_id_2=${this.projectInfo.user.user_id}`;
      console.log(isFollowingUrl);

      try {
        const response = await axios.get(isFollowingUrl);
        this.followed = response.data.followed;
        console.log("init: ", this.followed);

      } catch (error) {
        console.error('Error checking follow:', error);
      }
  
      try {
        const response = await axios.get(this.myService.getApiHost() + `/grid/checkLikeStatus?project_id=${this.data.data_source.project.project_id}&user_id=${this.user?.user_id}&type=project`);
        this.liked = response.data.liked;
      } catch (error) {
        console.error('Error checking follow:', error);
      }
    }
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
    this.isMenuOpen = !this.isMenuOpen;
  }

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
  @HostListener('document:keydown.control.s', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
    this.toggleSave();
  }


  onLoginButtonClick(): void {
    this.router.navigate(['/login']);
  }

  onSigninButtonClick(): void {
    this.router.navigate(['/signup']);
  }
  stopEditingTitle(): void {
    this.isEditingTitle = false;
  }

  toggleSave(): void {
    // console.log("header", this.webCodeData)
    // post api to save the code /project/saveProject
    const url = this.myService.getApiHost() + `/project/saveProject`;
    // console.log(this.data)
    axios.post(url, {
      data: this.data,
    })
      .then((response) => {
        // console.log(response);
        // alert("Saved Successfully")
        this.toastr.success('Saved Successfully', '');
      }, (error) => {
        console.log(error);
      });
  }

  toggleShare() {
    // console.log(this.myPen);
    let link = this.myService.getWebHost() + `/project/${this.data.data_source.project.project_id}`
    this.clipboard.copy(link);
    this.toastr.success('Link copied to clipboard', '');
    // this.clipboard.copy('Alphonso');

  }

  handleLikeClick() {
    const url = this.myService.getApiHost() + `/grid/handleLike?project_id=${this.data.data_source.project.project_id}&user_id=${this.user.user_id}&type=project`;

    axios.get(url).then((response) => {
      this.liked = response.data.liked;
    }).catch((error) => {
      console.error('Error:', error);
    });
  }


  handleFollowClick() {
    if (this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    } else {
      const url = this.myService.getApiHost() + `/grid/handleFollow?user_id_1=${this.user.user_id}&user_id_2=${this.projectInfo.user.user_id}`;

      axios.get(url).then((response) => {
        console.log("before: ", this.followed);
        this.followed = response.data.followed;
        console.log("response: ", response.data.followed);
        console.log("after: ", this.followed);

      }).catch((error) => {
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
