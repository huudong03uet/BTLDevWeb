import { Component, HostListener, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import axios from 'axios';
import { has, hasIn } from 'lodash';

@Component({
  selector: 'app-content-grid-collection-full-inf',
  templateUrl: './content-grid-collection-full-inf.component.html',
  styleUrls: ['./content-grid-collection-full-inf.component.scss']
})
export class ContentGridCollectionFullInfComponent implements OnInit {
  @Input() collection: any;
  pen_ids = [1, 2 , 3];
  collectionName: string = "";
  iframeContents: SafeHtml[] = ['', '', '', ''];
  collection_id: any;

  data_collection = {
    "like": 0,
    "name": "Chưa đặt tên",
    "comment": 0,
    "view": 0,
  }


  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
  ) { }


  get_data_pen(pen_id: number, index: number) {
    // init data -> data = response.data
    let data_pen: any;
    const apiUrl = `http://localhost:3000/pen/getInfoPen/${pen_id}`;
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

  ngOnInit(): void {
    if (!this.collection.collection_id) {
      console.error('Collection ID is missing.');
      return;
    }
    this.collection_id = this.collection.collection_id;
    const apiUrl = `http://localhost:3000/your-work/collections/${this.collection_id}/pens`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.pen_ids = response.pens || [];
        this.collectionName = response.collectionName || "";
        console.log(this.collectionName);
      },
      (error) => {
        console.error('Error fetching pen_ids:', error);
      }
    );

    for (let i = 0; i < this.pen_ids.length; i++) {
      this.get_data_pen(this.pen_ids[i], i);
    }
    for (let i = this.pen_ids.length; i < 4; i++) {
      this.get_data_pen_null(i);
    }

  }


  handlePageClick(): void {
    // link to collection/123
    this.router.navigate([`/collection/${this.collection.collection_id}`])
  }



  user_name = "hihihi"
  informationPen = [
    "Make Private",
    "Remove from Pins",
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


