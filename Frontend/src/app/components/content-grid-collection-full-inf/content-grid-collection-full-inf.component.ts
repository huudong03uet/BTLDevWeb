import { Component, HostListener, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from 'src/app/services/user-data.service';


import axios from 'axios';
import { has, hasIn } from 'lodash';
import { HostService } from 'src/app/host.service';


@Component({
  selector: 'app-content-grid-collection-full-inf',
  templateUrl: './content-grid-collection-full-inf.component.html',
  styleUrls: ['./content-grid-collection-full-inf.component.scss']
})
export class ContentGridCollectionFullInfComponent implements OnInit {
  @Input() collection: any;
  pen_ids = [1, 2, 3];
  collectionName: string = "";
  iframeContents: SafeHtml[] = ['', '', '', ''];
  collection_id: any;
  data_collection = {
    "like": 0,
    "name": "Untitled",
    "comment": 0,
    "view": 0,
  }


  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private myService: HostService,
    private userData: UserDataService,

  ) { }


  get_data_pen(pen_id: number, index: number) {
    // init data -> data = response.data
    let data_pen: any;
    const apiUrl = this.myService.getApiHost() + `/pen/getInfoPen?pen_id=${pen_id}&user_id=null`;

    axios.get(apiUrl)
      .then((response) => {
        data_pen = response.data;
        console.log("data_pen: ", data_pen)
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

  ngOnInit(): void {
    console.log('abc', this.collection)

    if (!this.collection.collection_id) {
      console.error('Collection ID is missing.');
      return;
    }
    this.collection_id = this.collection.collection_id;
    const apiUrl = this.myService.getApiHost() + `/your-work/collections/${this.collection_id}/pens`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.pen_ids = response.pen_ids || [];
        this.collectionName = response.collectionName || "";
        console.log(this.collectionName);
        console.log("this.pen_ids: ", this.pen_ids)
        for (let i = 0; i < this.pen_ids.length && i < 4; i++) {
          this.get_data_pen(this.pen_ids[i], i);
        }
        for (let i = this.pen_ids.length; i < 4; i++) {
          this.get_data_pen_null(i);
        }
      },
      (error) => {
        console.error('Error fetching pen_ids:', error);
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
    this.router.navigate([`/collection/${this.collection.collection_id}`])
  }

  handlePinClick() {
    if (this.userData.getUserData == null) {
      this.router.navigate([`/login`]);
    }
    const url = this.myService.getApiHost() + `/grid/handlePin?id=${this.collection_id}&user_id=${this.userData.getUserData()?.user_id}&type=collection`;
    // console.log("url: ", url)
    axios.get(url)
      .then((response) => {
        // console.log("response: ", response.data);
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
    "Delete",
  ]


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

  handleDeleteClick() {
    const confirmed = confirm("Are you sure you want to delete this collection?");
    if (confirmed) {
      const url = this.myService.getApiHost() + `/your-work/collections/removeCollection`;

      const data = {
        collection_id: this.collection_id,
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

  }

  clickGridCollectionFullInf() {
    this.router.navigate([`/collection/${this.collection.collection_id}`], { relativeTo: null });
  }
}


