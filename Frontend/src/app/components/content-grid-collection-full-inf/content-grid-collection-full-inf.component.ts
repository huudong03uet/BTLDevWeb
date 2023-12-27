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
  pen_ids= [3, 2];
  // data: any;
  // datas_pen: any[] | undefined;
  namePen: any;

  // init with 4 element
  iframeContents: SafeHtml[] = ['','','',''];

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


  get_data_pen(pen_id: number, index: number){
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
            <style>
            ${data_pen.pen.css_code}</style>
          </head>
          <body>
            ${data_pen.pen.html_code}
            <script>${data_pen.pen.js_code}</script>
          </body>
        </html>
      `;
        // this.iframeContent = this.sanitizer.bypassSecurityTrustHtml(iframeContent);

        // this.datas_pen?.push(data_pen);
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
    // this.iframeContent = this.sanitizer.bypassSecurityTrustHtml(iframeContent);

  this.iframeContents[index] = (this.sanitizer.bypassSecurityTrustHtml(iframeContent));
    
  }

 ngOnInit(): void {
    // if (this.pen_ids.length == 0) {
    //   this.get_data_pen_null(0);
    //   this.get_data_pen_null(1);
    //   this.get_data_pen_null(2);
    //   this.get_data_pen_null(3);
    // }
    // if (this.pen_ids.length == 1) {
    //   this.get_data_pen(this.pen_ids[0], 0);
    //   this.get_data_pen_null(1);
    //   this.get_data_pen_null(2);
    //   this.get_data_pen_null(3);
    // }
    // if (this.pen_ids.length == 2) {
    //   this.get_data_pen(this.pen_ids[0], 0);
    //   this.get_data_pen(this.pen_ids[1], 1);
    //   this.get_data_pen_null(2);
    //   this.get_data_pen_null(3);
    // }
    // if (this.pen_ids.length == 3) {
    //   this.get_data_pen(this.pen_ids[0], 0);
    //   this.get_data_pen(this.pen_ids[1], 1);
    //   this.get_data_pen(this.pen_ids[2], 2);
    //   this.get_data_pen_null(3);
    // }
    // if (this.pen_ids.length >= 4) {
    //   this.get_data_pen(this.pen_ids[0], 0);
    //   this.get_data_pen(this.pen_ids[1], 1);
    //   this.get_data_pen(this.pen_ids[2], 2);
    //   this.get_data_pen(this.pen_ids[3], 3);
    // }
for (let i = 0; i < this.pen_ids.length; i++) {
  this.get_data_pen(this.pen_ids[i], i);
}
for (let i = this.pen_ids.length; i < 4; i++) {
  this.get_data_pen_null(i);
}

  }

  // Remove the duplicate function implementation
  // get_data_pen(pen_id: number): SafeHtml {
  //     // init data -> data = response.data
  //     let data_pen: any;
  //     const apiUrl = `http://localhost:3000/pen/getInfoPen/${pen_id}`;
  //     axios.get(apiUrl)
  //       .then((response) => {
  //         data_pen = response.data;
  //         this.namePen = (data_pen.pen.name == null) ? "Chưa đặt tên" : data_pen.pen.name;
  //         const iframeContent = `
  //         <html>
  //           <head>
  //             <style>
  //             ${data_pen.pen.css_code}</style>
  //           </head>
  //           <body>
  //             ${data_pen.pen.html_code}
  //             <script>${data_pen.pen.js_code}</script>
  //           </body>
  //         </html>
  //       `;
  //         return this.sanitizer.bypassSecurityTrustHtml(iframeContent);
  //       })
  //       .catch((error) => {
  //         console.error('Error:', error);
  //         return '';
  //       });
  //   }

  

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



