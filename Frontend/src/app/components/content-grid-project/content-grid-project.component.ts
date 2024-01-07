import { PinnedCollectionComponent } from './../pinned-collection/pinned-collection.component';
import { UserDataService } from './../../services/user-data.service';
import { Component, HostListener, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { has, hasIn } from 'lodash';

import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-content-grid-project',
  templateUrl: './content-grid-project.component.html',
  styleUrls: ['./content-grid-project.component.scss']
})
export class ContentGridProjectComponent implements OnInit {
  @Input() project_id: any;
  data: any;
  namePen: any;
  // iframeImage -> assets/images/project.png
  iframeImage: any;
  pined: any;
  followed: any;
  informationPen = [
    "Delete",
    "Make private"
  ]


  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private userData: UserDataService,
    private myService: HostService,
  ) { }


  ngOnInit(): void {
    this.iframeImage = this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/project.png');
    // this.data = this.project_id;
    // console.log("this.data", this.data)
    
    const checkStatusUrl = this.myService.getApiHost() + '/project/getProjectByID?project_id=' + this.project_id;
    // console.log("this.project.projectid", this.project_id.project_id)
    axios.get(checkStatusUrl)
      .then((response) => {
        this.data = response.data;
        this.informationPen[1] = response.data.status === 'public' ? 'Make Private' : 'Make Public';
      })
      .catch((error) => {
        console.error('Error checking Project status:', error);
      });
  }

  // Function to handle the "Make Private/Make Public" button click
  handleToggleStatusClick() {
    const toggleStatusUrl = this.myService.getApiHost() + `/project/toggleStatus`;

    axios.post(toggleStatusUrl, { project_id: this.project_id.project_id })
      .then((response) => {
        this.informationPen[1] = response.data.status === 'public' ? 'Make Private' : 'Make Public';
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);      })
      .catch((error) => {
        console.error('Error toggling collection status:', error);
      });
  }


  loadPinAndFollow() {
    const url = this.myService.getApiHost() + `/grid/getInfoGrid?pen_id=${this.project_id.project_id}&user_id=${this.userData.getUserData()?.user_id}`;
    axios.get(url)
      .then((response) => {
        this.pined = response.data.pined;
        this.followed = response.data.followed;
        this.informationPen[1] = !this.pined ? "Add to Pins" : "Remove to Pins";
        this.informationPen[2] = this.followed ? `Unfollow ${this.data.user.user_name}` : `Follow ${this.data.user.user_name}`;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handlePageClick(): void {
    this.router.navigate([`/project/${this.project_id}`], { relativeTo: null });
  }

  random_number = Math.floor(Math.random() * 100000000);

  hasInformationPen = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    if (this.hasInformationPen == true) {
      var x = document.getElementsByClassName("list-items");
      if (x != null) {
        for (let i = 0; i < x.length; i++) {
          if (x.item(i)!.classList.contains("show")) {
            x.item(i)!.classList.remove("show");
            this.hasInformationPen = false;
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

  onClickInformationPen() {
    var x = document.getElementsByClassName("list-items");

    if (x != null) {
      for (let i = 0; i < x.length; i++) {
        if (x.item(i)!.classList.contains(this.random_number.toString())) {
          if (x.item(i)!.classList.contains("show")) {
            x.item(i)!.classList.remove("show");
            this.hasInformationPen = false;
          } else {
            x.item(i)!.classList.add("show");
            this.hasInformationPen = true;
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
    const url = this.myService.getApiHost() + `/grid/handleLike?pen_id=${this.data.pen.pen_id}&user_id=${this.userData.getUserData()?.user_id}&type=pen`;

    axios.get(url)
      .then((response) => {

        if (response.data.liked) {
          this.data.like++;
        } else {
          this.data.like--;
        }

        this.data.liked = response.data.liked;
      })
      .catch((error) => {
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
    const url = this.myService.getApiHost() + `/grid/handlePin?id=${this.data.pen.pen_id}&user_id=${this.userData.getUserData()?.user_id}&type=pen`;

    axios.get(url)
      .then((response) => {
        this.pined = response.data.pinned;
        this.informationPen[1] = !this.pined ? "Add to Pins" : "Remove to Pins";
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }


  handleFollowClick() {
    if (this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    } else {
      const url = this.myService.getApiHost() + `/grid/handleFollow?user_id_1=${this.userData.getUserData()?.user_id}&user_id_2=${this.data.user.user_id}`;

      axios.get(url)
        .then((response) => {
          this.followed = response.data.followed;
          this.informationPen[2] = this.followed ? `Unfollow ${this.data.user.user_name}` : `Follow ${this.data.user.user_name}`;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  childDetailPenVisible: boolean = false;
  openDetailPen() {
    this.childDetailPenVisible = !this.childDetailPenVisible;
    document.body.style.overflow = 'hidden';

  }
  handleChildDetailPenClose() {
    this.childDetailPenVisible = false;
    document.body.style.overflow = 'auto';
  }
  handleDeleteClick() {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (confirmed) {
      const url = this.myService.getApiHost() + `/project/remove`;
      const data = {
        project_id: this.project_id.project_id,
        delete: true
      };

      axios.post(url, data)
        .then(response => {
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
