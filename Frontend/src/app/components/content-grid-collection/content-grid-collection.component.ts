import { PinnedCollectionComponent } from './../pinned-collection/pinned-collection.component';
import { UserDataService } from './../../services/user-data.service';
import { Component, HostListener, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { has, hasIn } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-content-grid-collection',
  templateUrl: './content-grid-collection.component.html',
  styleUrls: ['./content-grid-collection.component.scss']
})
export class ContentGridCollectionComponent implements OnInit {
  @Input() collection: any;
  @Input() is_pinned: boolean = false;
  pen_ids = [1, 2, 3];
  collectionName: string = "";
  iframeContents: SafeHtml[] = [
    '', '', '', ''
  ];
  collection_id: any;
  userName: any;
  data_collection = {
    "like": 0,
    "name": "Chưa đặt tên",
    "comment": 0,
    "view": 0,
  }


  constructor(private router: Router, private sanitizer: DomSanitizer, private http: HttpClient,
    private userData: UserDataService,
    private myService: HostService,
  ) { }


  get_data_pen(pen_id: number, index: number) {
    // init data -> data = response.data
    let data_pen: any;
    const apiUrl = this.myService.getApiHost() + `/pen/getInfoPen?pen_id=${pen_id}&user_id=null`;

    axios.get(apiUrl)
      .then((response) => {
        data_pen = response.data;
        const iframeContent = `
        <html>
          <head>
            <style>
            ${data_pen.pen.css_code}</style>
          </head>
          <body>
            ${data_pen.pen.html_code}
            <script>${data_pen.pen.js_code}</script>
          </body>
        </html>
      `;
        this.iframeContents[index] = (this.sanitizer.bypassSecurityTrustHtml(iframeContent));
      })
      .catch((error) => {
        console.error('Error:', error);
        return '';
      });


  }


  get_data_pen_null(index: number) {
    const iframeContent = `
    <html>
      <head>
        <style>
          * {
            background-color: #434756;
          }
        </style>
      </head>
      <body>
      </body>
    </html>
  `;

    this.iframeContents[index] = (this.sanitizer.bypassSecurityTrustHtml(iframeContent));

  }

  cssDoanNay() {
    if (this.is_pinned == true) {
      var x = document.getElementsByClassName("code-grid-container");
      if (x != null) {
        for (let i = 0; i < x.length; i++) {
          // if (x.item(i)!.classList.contains(this.random_number.toString())) {
          x.item(i)!.classList.add("code-grid-container-pinned");
          // }
        }



      }

    }
  }

  ngOnInit(): void {

    if (!this.collection) {
      console.error('Collection ID is missing.');
      return;
    }
    this.collection_id = this.collection.collection_id;

    const apiUrl = this.myService.getApiHost() + `/your-work/collections/${this.collection_id}/pens`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.pen_ids = response.pen_ids || [];
        this.collectionName = response.collectionName || "";
        for (let i = 0; i < this.pen_ids.length; i++) {
          this.get_data_pen(this.pen_ids[i], i);
        }
        for (let i = this.pen_ids.length; i < 4; i++) {
          this.get_data_pen_null(i);
        }
        this.cssDoanNay();

      },
      (error) => {
        console.error('Error fetching pen_ids:', error);
      }
    );

    this.http.get(`${this.myService.getApiHost()}/your-work/collections/getUserInfoByCollectionId/${this.collection_id}`)
      .subscribe(
        (response: any) => {
          this.userName = response.user.user_name;
        },
        (error) => {
          console.error('Error fetching user information and collection:', error);
        }
      );

    const checkStatusUrl = this.myService.getApiHost() + `/your-work/collections/checkStatus?collection_id=${this.collection_id}`;

    axios.get(checkStatusUrl)
      .then((response) => {
        this.informationPen[0] = response.data.status === 'public' ? 'Make Private' : 'Make Public';
      })
      .catch((error) => {
        console.error('Error checking collection status:', error);
      });
  }

  // Function to handle the "Make Private/Make Public" button click
  handleToggleStatusClick() {
    const toggleStatusUrl = this.myService.getApiHost() + `/your-work/collections/toggleStatus`;

    axios.post(toggleStatusUrl, { collection_id: this.collection_id })
      .then((response) => {
        this.informationPen[0] = response.data.status === 'public' ? 'Make Private' : 'Make Public';
      })
      .catch((error) => {
        console.error('Error toggling collection status:', error);
      });
  }


  handlePageClick(): void {
    // link to collection/123
    this.router.navigate([`/collection/${this.collection_id}`])
  }

  handlePinClick() {
    if (this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    }
    const url = this.myService.getApiHost() + `/grid/handlePin?id=${this.collection_id}&user_id=${this.userData.getUserData()?.user_id}&type=collection`;
    axios.get(url)
      .then((response) => {
        let pined = response.data.pinned;
        this.informationPen[1] = !pined ? "Add to Pins" : "Remove to Pins";
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }



  user_name = "hihihi"
  informationPen = [
    "Make Private",
    "Add to Pins",
    "Unfollow User",
  ]


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

  clickGridCollectionFullInf() {
    this.router.navigate([`/collection/${this.collection_id}`], { relativeTo: null });
  }

}
