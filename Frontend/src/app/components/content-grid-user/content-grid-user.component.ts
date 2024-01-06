import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserDataService } from 'src/app/services/user-data.service';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-content-grid-user',
  templateUrl: './content-grid-user.component.html',
  styleUrls: ['./content-grid-user.component.scss']
})
export class ContentGridUserComponent implements OnInit {
  @Input() user: any;
  data: any;
  name: any;
  pens: any;
  iframeContent_1: SafeHtml | undefined;
  iframeContent_2: SafeHtml | undefined;
  followed: boolean = false;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private myService: HostService,
    private userData: UserDataService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.name = this.user.user_name;
    const apiUrl = this.myService.getApiHost() + `/pen/getPenByUserIDForFollow/${this.user.user_id}`;
    axios.get(apiUrl).then((response) => {
      this.data = response.data;
      // console.log('user_id:', this.user[idx].user_id);
      // console.log('data_pen:', this.data);
      if (this.data == null) {
        return;
      }
      const iframeContent_1 = `
        <html>
          <head>
            <style>${this.data[0].css_code}</style>
          </head>
          <body>
            ${this.data[0].html_code}
            <script>${this.data[0].js_code}</script>
          </body>
        </html>
      `;
      this.iframeContent_1 = this.sanitizer.bypassSecurityTrustHtml(iframeContent_1);

      const iframeContent_2 = `
        <html>
          <head>
            <style>${this.data[1].css_code}</style>
          </head>
          <body>
            ${this.data[1].html_code}
            <script>${this.data[1].js_code}</script>
          </body>
        </html>
      `;
      this.iframeContent_2 = this.sanitizer.bypassSecurityTrustHtml(iframeContent_2);
    }).catch((error) => {
      console.error('Error:', error);
    });

    axios.get(this.myService.getApiHost() + `/pen/getPenByUser/${this.user.user_id}`).then((response) => {
      this.pens = response.data;
    }).catch((error) => {
      console.error('Error:', error);
    });

    const isFollowingUrl = this.myService.getApiHost() + `/grid/isUser1FollowingUser2?user_id_1=${this.userData.getUserData()?.user_id}&user_id_2=${this.user.user_id}`;
    axios.get(isFollowingUrl)
      .then((response) => {
        this.followed = response.data.followed;
      })
      .catch((error) => {
        console.error('Error checking follow:', error);
      });
  }


  handlePageClick(): void {
    // console.log(`/pen/${this.pen_id}`);
    this.router.navigate([`/pen/${this.data.pen_id}`], { relativeTo: null });
  }

  handleFollowClick() {
    if (this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    } else {
      // Update the follow status through the API
      const url = this.myService.getApiHost() + `/grid/handleFollow?user_id_1=${this.userData.getUserData()?.user_id}&user_id_2=${this.user.user_id}`;

      axios.get(url)
        .then((response) => {
          this.followed = response.data.followed;

          // Reload the current route to reflect the updated follow status
          // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate([this.router.url]);
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
