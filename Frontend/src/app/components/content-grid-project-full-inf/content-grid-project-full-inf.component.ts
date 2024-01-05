import { Component, HostListener, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserDataService } from './../../services/user-data.service';
import { Router } from '@angular/router';
import axios from 'axios';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-content-grid-project-full-inf',
  templateUrl: './content-grid-project-full-inf.component.html',
  styleUrls: ['./content-grid-project-full-inf.component.scss']
})
export class ContentGridProjectFullInfComponent implements OnInit {
  @Input() project: any;
  data: any;
  namePen: any;
  iframeContent: SafeHtml | undefined;
  // iframeImage -> assets/images/project.png
  iframeImage: any;
  pined: any;
  followed: any;
  informationPen = [
    "Delete",
    "Remove from Pins",
    "Unfollow User"
  ]

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private userData: UserDataService,
    private myService: HostService,
  ) {
    
   }

  ngOnInit(): void {
    this.iframeImage = this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/project.png');
  }

  loadPinAndFollow() {
    const url =  this.myService.getApiHost() + `/grid/getInfoGrid?pen_id=${this.project.project_id}&user_id=${this.userData.getUserData()?.user_id}`;
    axios.get(url)
      .then((response) => {
        this.pined = response.data.pined;
        this.followed = response.data.followed;
        this.informationPen[1] = !this.pined ? "Add to Pins" : "Remove to Pins";
        this.informationPen[2] = !this.followed ? `Follow ${this.data.user.user_name}` : `Unfollow ${this.data.user.user_name}`;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handlePageClick(): void {
    // console.log(`/pen/${this.pen_id}`);
    this.router.navigate([`/pen/${this.project.project_id}`], { relativeTo: null });
  }

  random_number = Math.floor(Math.random() * 100000000);

  hasInformationPen = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    // console.log("hasInformationPen: ", this.hasInformationPen)
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
    this.loadPinAndFollow();
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
    const url =  this.myService.getApiHost() + `/grid/handleLike?pen_id=${this.data.pen.pen_id}&user_id=${this.userData.getUserData()?.user_id}&type=pen`;

    axios.get(url).then((response) => {
      console.log(response);

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
    const url =  this.myService.getApiHost() + `/grid/handlePin?pen_id=${this.data.pen.pen_id}&user_id=${this.userData.getUserData()?.user_id}&type=pen`;

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
      const url =  this.myService.getApiHost() + `/grid/handleFollow?user_id_1=${this.userData.getUserData()?.user_id}&user_id_2=${this.data.user.user_id}`;

      axios.get(url)
        .then((response) => {
          this.followed = response.data.followed;
          this.informationPen[2] = !this.followed ? `Follow ${this.data.user.user_name}` : `Unfollow ${this.data.user.user_name}`;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  childDetailPenVisible: boolean = false;
  openDetailPen() {
    this.childDetailPenVisible = !this.childDetailPenVisible;
    // hidden scroll bar body
    document.body.style.overflow = 'hidden';
    
    // remove scroll bar bottom
  }
  handleChildDetailPenClose() {
    this.childDetailPenVisible = false;
  }
  
  handleDeleteClick() {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (confirmed) {
      const url = this.myService.getApiHost() + `/project/remove`;
      console.log(this.project.project_id);
      const data = {
        project_id: this.project.project_id,
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