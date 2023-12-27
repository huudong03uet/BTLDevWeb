import { Component, HostListener, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { has, hasIn } from 'lodash';

@Component({
  selector: 'app-content-grid-collection-full-inf',
  templateUrl: './content-grid-collection-full-inf.component.html',
  styleUrls: ['./content-grid-collection-full-inf.component.scss']
})
export class ContentGridCollectionFullInfComponent implements OnInit {
  @Input() collection_id: any;
  pen_ids= [2, 2, 3, 1, 2, 3];
  // data: any;
  // datas_pen: any[] | undefined;
  namePen: any;
  iframeContents: SafeHtml[] = [];

  data_collection = {
    "like": 0,
    "name": "Chưa đặt tên",
    "comment": 0,
    "view": 0,
  }


  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }


  get_data_pen(pen_id: number) {
    // init data -> data = response.data
    let data_pen: any;
    const apiUrl = `http://localhost:3000/pen/getInfoPen/${pen_id}`;
    axios.get(apiUrl)
      .then((response) => {
        data_pen = response.data;
        // console.log('Data:', this.data);
        this.namePen = (data_pen.pen.name == null) ? "Chưa đặt tên" : data_pen.pen.name;
        const iframeContent = `
        <html>
          <head>
            <style>${data_pen.pen.css_code}</style>
          </head>
          <body>
            ${data_pen.pen.html_code}
            <script>${data_pen.pen.js_code}</script>
          </body>
        </html>
      `;
        // this.iframeContent = this.sanitizer.bypassSecurityTrustHtml(iframeContent);

        // this.datas_pen?.push(data_pen);
        this.iframeContents?.push(this.sanitizer.bypassSecurityTrustHtml(iframeContent));
      })
      .catch((error) => {
        console.error('Error:', error);
      });


  }

  ngOnInit(): void {
    for (let i = 0; i < this.pen_ids.length && i < 4; i++) {
      this.get_data_pen(this.pen_ids[i]);
    }
    console.log(this.iframeContents);

  }

  handlePageClick(): void {
    // link to collection/123
    this.router.navigate([`/collection/123`])
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

    // var y = document.getElementsByClassName("footer-code-grid-container");
    // if (y != null) {
    //   for (let i = 0; i < y.length; i++) {
    //     if (y.item(i)!.classList.contains(this.random_number.toString())) {
    //       y.item(i)!.classList.add("enter-show");
    //     } else {
    //       y.item(i)!.classList.remove("enter-show");
    //     }
    //   }
    // }
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

    // var y = document.getElementsByClassName("footer-code-grid-container");
    // if (y != null) {
    //   for (let i = 0; i < y.length; i++) {
    //     if (y.item(i)!.classList.contains(this.random_number.toString())) {
    //       y.item(i)!.classList.remove("enter-show");
    //     }
    //   }
    // }
  }

  clickGridCollectionFullInf() {
    this.router.navigate([`/collection/${this.collection_id}`], { relativeTo: null });
  }
}
