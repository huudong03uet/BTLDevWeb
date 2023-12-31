import { PinnedCollectionComponent } from './../pinned-collection/pinned-collection.component';
import { UserDataService } from './../../services/user-data.service';
import { Component, HostListener, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { has, hasIn } from 'lodash';

import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-content-grid-code',
  templateUrl: './content-grid-code.component.html',
  styleUrls: ['./content-grid-code.component.scss']
})
export class ContentGridCodeComponent implements OnInit {
  @Input() pen_id: any;
  data: any;
  namePen: any;
  iframeContent: SafeHtml | undefined;
  pined: any;
  followed: any;
  informationPen = [
    "Add to Collection",
    "Remove from Pins",
    "Unfollow User"
  ]
  

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private userData: UserDataService,
    private myService: HostService,
  ) { }

  ngOnInit(): void {
    const apiUrl = this.myService.getApiHost() + `/pen/getInfoPen?pen_id=${this.pen_id}&user_id=${this.userData.getUserData()?.user_id}`;
    axios.get(apiUrl)
      .then((response) => {
        this.data = response.data;
        this.namePen = (this.data.pen.name == null) ? "Untitled" : this.data.pen.name;
        const iframeContent = `
        <html>
          <head>
            <style>${this.data.pen.css_code}
            html, body {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              overflow: clip;
            } </style>
          </head>
          <body>
            ${this.data.pen.html_code}
            <script>${this.data.pen.js_code}</script>
          </body>
        </html>
      `;
        this.iframeContent = this.sanitizer.bypassSecurityTrustHtml(iframeContent);
        this.informationPen = [
          "Add to Collection",
          "Remove from Pins",
          "Unfollow " + this.data.user.user_name
        ]
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  

  loadPinAndFollow() {
    const url =  this.myService.getApiHost() + `/grid/getInfoGrid?pen_id=${this.pen_id}&user_id=${this.userData.getUserData()?.user_id}`;
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
    this.router.navigate([`/pen/${this.pen_id}`], { relativeTo: null });
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
    if(this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    }
    const url =  this.myService.getApiHost() + `/grid/handleLike?pen_id=${this.data.pen.pen_id}&user_id=${this.userData.getUserData()?.user_id}&type=pen`;

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
    if(this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    }
    const url =  this.myService.getApiHost() + `/grid/handlePin?id=${this.data.pen.pen_id}&user_id=${this.userData.getUserData()?.user_id}&type=pen`;

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
    if(this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    } else {
      const url =  this.myService.getApiHost() + `/grid/handleFollow?user_id_1=${this.userData.getUserData()?.user_id}&user_id_2=${this.data.user.user_id}`;

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




}
