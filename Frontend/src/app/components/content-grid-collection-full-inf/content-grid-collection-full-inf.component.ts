import { Component, HostListener, Input, OnChanges, OnInit, SecurityContext } from '@angular/core';
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
  @Input() collection_id: any = [1];
  pen_ids = [1, 2, 3, 4];
  collectionName: string = "";
  iframeContents: SafeHtml[] = ['', '', '', ''];

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
    const apiUrl = `http://localhost:3000/pen/getInfoPen?pen_id=${pen_id}&user_id=${null}`;
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
    // ngOnInit(): void {
      // console.log("loi loi vaf loi", this.collection_id)
      if (!this.collection_id) {
        console.error('Collection ID is missing.');
        return;
      }

      this.collectionName = this.collection_id.name;
  
      const apiUrl = `http://localhost:3000/your-work/collections/${this.collection_id.collection_id}/pens`;
  
      axios.get(apiUrl).then((response) => {
        this.pen_ids = response.data.pen_ids;

        for (let i = 0; i < this.pen_ids.length; i++) {
          this.get_data_pen(this.pen_ids[i], i);
        }
        for (let i = this.pen_ids.length; i < 4; i++) {
          this.get_data_pen_null(i);
        }
      }).catch((error) => {
        console.error('Error:', error);
      });
    }

    ngOnChanges(): void {
      if (!this.collection_id) {
        console.error('Collection ID is missing.');
        return;
      }

      this.collectionName = this.collection_id.name;
  
      const apiUrl = `http://localhost:3000/your-work/collections/${this.collection_id.collection_id}/pens`;
  
      axios.get(apiUrl).then((response) => {
        this.pen_ids = response.data.pen_ids;

        for (let i = 0; i < this.pen_ids.length; i++) {
          this.get_data_pen(this.pen_ids[i], i);
        }
        for (let i = this.pen_ids.length; i < 4; i++) {
          this.get_data_pen_null(i);
        }
      }).catch((error) => {
        console.error('Error:', error);
      });
    }


  handlePageClick(): void {
    // link to collection/123
    this.router.navigate([`/collection/${this.collection_id}`])
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
    this.router.navigate([`/collection/${this.collection_id}`], { relativeTo: null });
  }
}



