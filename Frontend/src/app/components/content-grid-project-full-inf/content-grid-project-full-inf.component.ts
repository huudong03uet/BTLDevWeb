import { Component, HostListener, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserDataService } from './../../services/user-data.service';
import { Router } from '@angular/router';
import axios from 'axios';
import { has, hasIn } from 'lodash';

import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-content-grid-project-full-inf',
  templateUrl: './content-grid-project-full-inf.component.html',
  styleUrls: ['./content-grid-project-full-inf.component.scss']
})
export class ContentGridCodeFullInfComponent implements OnInit {
  @Input() project_id: any;
  data: any;
  nameProject: any;
  iframeContent: SafeHtml | undefined;
  pined: any;
  followed: any;
  informationProject = [
    "Add to Collection",
    "Remove from Pins",
    "Make Private",
    "Delete"
  ]

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private userData: UserDataService,
    private myService: HostService,
  ) { }

  ngOnInit(): void {
    const apiUrl =  this.myService.getApiHost() + `/project/getInfoProject?project_id=${this.project_id}&user_id=${this.userData.getUserData()?.user_id}`;
    axios.get(apiUrl)
      .then((response) => {
        this.data = response.data;
        this.nameProject = (this.data.project.name == null) ? "Chưa đặt tên" : this.data.project.name;
        const iframeContent = `
        <html>
          <head>
            <style>${this.data.project.css_code}
            html, body {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              overflow: clip;
            } </style>
          </head>
          <body>
            ${this.data.project.html_code}
            <script>${this.data.project.js_code}</script>
          </body>
        </html>
      `;
        this.iframeContent = this.sanitizer.bypassSecurityTrustHtml(iframeContent);
        this.informationProject = [
          "Add to Collection",
          "Remove from Pins",
          // "Unfollow " + this.data.user.user_name
          "Make Private",
          "Delete"
        ]
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      const checkStatusUrl = `${this.myService.getApiHost()}/project/checkStatus?project_id=${this.project_id}`;
      axios.get(checkStatusUrl)
        .then((response) => {
          const projectStatus = response.data.status;
          this.informationProject[2] = projectStatus === 'public' ? 'Make Private' : 'Make Public';
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }

  loadPinAndFollow() {
    const url =  this.myService.getApiHost() + `/grid/getInfoGrid?project_id=${this.project_id}&user_id=${this.userData.getUserData()?.user_id}`;
    axios.get(url)
      .then((response) => {
        this.pined = response.data.pined;
        this.followed = response.data.followed;
        this.informationProject[1] = !this.pined ? "Add to Pins" : "Remove to Pins";
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handlePageClick(): void {
    this.router.navigate([`/project/${this.project_id}`], { relativeTo: null });
  }
  handleToggleStatusClick() {
    const toggleStatusUrl = `${this.myService.getApiHost()}/project/toggleStatus`;
    const requestData = {
      project_id: this.project_id,
    };

    axios.post(toggleStatusUrl, requestData)
      .then((response) => {
        this.informationProject[2] = response.data.project.status === 'public' ? 'Make Private' : 'Make Public';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  random_number = Math.floor(Math.random() * 100000000);

  hasInformationProject = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    if (this.hasInformationProject == true) {
      var x = document.getElementsByClassName("list-items");
      if (x != null) {
        for (let i = 0; i < x.length; i++) {
          if (x.item(i)!.classList.contains("show")) {
            x.item(i)!.classList.remove("show");
            this.hasInformationProject = false;
          }
        }
      }
    }

    if (this.hasListCollectionAdd == true) {
      var x = document.getElementsByClassName("list-collection-add");
      if (x != null) {
        for (let i = 0; i < x.length; i++) {
          if (x.item(i)!.classList.contains("show")) {
            x.item(i)!.classList.remove("show");
            this.hasListCollectionAdd = false;
          }
        }
      }
    }


  }

  onClickInformationProject() {
    this.loadPinAndFollow();
    var x = document.getElementsByClassName("list-items");

    if (x != null) {
      for (let i = 0; i < x.length; i++) {
        if (x.item(i)!.classList.contains(this.random_number.toString())) {
          if (x.item(i)!.classList.contains("show")) {
            x.item(i)!.classList.remove("show");
            this.hasInformationProject = false;
          } else {
            x.item(i)!.classList.add("show");
            this.hasInformationProject = true;
          }

        } else {
          x.item(i)!.classList.remove("show");
        }
      }
    }
  }



  hasListCollectionAdd = false;
  onClickAddCollection() {
    var x = document.getElementsByClassName("list-collection-add");
    if (x != null) {
      for (let i = 0; i < x.length; i++) {
        if (x.item(i)!.classList.contains(this.random_number.toString())) {
          if (x.item(i)!.classList.contains("show")) {
            x.item(i)!.classList.remove("show");
            this.hasListCollectionAdd = false;
          } else {
            x.item(i)!.classList.add("show");
            this.hasListCollectionAdd = true;
          }

        } else {
          x.item(i)!.classList.remove("show");
        }
      }
    }
  }


  onMouseEnterGridCode() {

    var x = document.getElementsByClassName("background-code");
    if (x != null) {
      for (let i = 0; i < x.length; i++) {
        if (x.item(i)!.classList.contains(this.random_number.toString())) {
          x.item(i)!.classList.add("enter-show");
        } else {
          x.item(i)!.classList.remove("enter-show");
        }
      }
    }

    var y = document.getElementsByClassName("footer-code-grid-container");
    if (y != null) {
      for (let i = 0; i < y.length; i++) {
        if (y.item(i)!.classList.contains(this.random_number.toString())) {
          y.item(i)!.classList.add("enter-show");
        } else {
          y.item(i)!.classList.remove("enter-show");
        }
      }
    }
  }

  onMouseLeaveGridCode() {

    var x = document.getElementsByClassName("background-code");
    if (x != null) {
      for (let i = 0; i < x.length; i++) {
        if (x.item(i)!.classList.contains(this.random_number.toString())) {
          x.item(i)!.classList.remove("enter-show");
        }
      }
    }

    var y = document.getElementsByClassName("footer-code-grid-container");
    if (y != null) {
      for (let i = 0; i < y.length; i++) {
        if (y.item(i)!.classList.contains(this.random_number.toString())) {
          y.item(i)!.classList.remove("enter-show");
        }
      }
    }
  }

  handleLikeClick() {
    if (this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    }
    const url =  this.myService.getApiHost() + `/grid/handleLike?project_id=${this.data.project.project_id}&user_id=${this.userData.getUserData()?.user_id}&type=project`;

    axios.get(url).then((response) => {

      if (response.data.liked) {
        this.data.like++;
      } else {
        this.data.like--;
      }

      this.data.liked = response.data.liked;
    }).catch((error) => {
      console.error('Error:', error);

      // Nếu xảy ra lỗi, đảm bảo đồng bộ lại giá trị 'liked' và 'like'
      this.data.liked = this.data.liked;
      if (this.data.liked) {
        this.data.like++;
      } else {
        this.data.like--;
      }
    });
  }

  handlePinClick() {
    if (this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    }
    const url =  this.myService.getApiHost() + `/grid/handlePin?id=${this.data.project.project_id}&user_id=${this.userData.getUserData()?.user_id}&type=project`;

    axios.get(url)
      .then((response) => {
        this.pined = response.data.pinned;
        this.informationProject[1] = !this.pined ? "Add to Pins" : "Remove to Pins";
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  handleFollowClick() {
    if (this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    } else {
      const url =  this.myService.getApiHost() + `/grid/handleFollow?user_id_1=${this.userData.getUserData()?.user_id}&user_id_2=${this.data.user.user_id}`;

      axios.get(url)
        .then((response) => {
          this.followed = response.data.followed;
          this.informationProject[2] = !this.followed ? `Follow ${this.data.user.user_name}` : `Unfollow ${this.data.user.user_name}`;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  childDetailProjectVisible: boolean = false;
  openDetailProject() {
    this.childDetailProjectVisible = !this.childDetailProjectVisible;
  }
  handleChildDetailProjectClose() {
    this.childDetailProjectVisible = false;
  }

  handleDeleteClick() {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (confirmed) {
      const url = this.myService.getApiHost() + `/project/createOrUpdateProject`;
      const data = {
        project_id: this.project_id,
        delete: true
      };
  
      axios.post(url, data)
        .then(response => {
          console.log(response);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
}
