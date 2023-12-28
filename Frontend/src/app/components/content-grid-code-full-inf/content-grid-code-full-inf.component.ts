import { Component, HostListener, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { has, hasIn } from 'lodash';

@Component({
  selector: 'app-content-grid-code-full-inf',
  templateUrl: './content-grid-code-full-inf.component.html',
  styleUrls: ['./content-grid-code-full-inf.component.scss']
})
export class ContentGridCodeFullInfComponent implements OnInit {
  @Input() pen_id: any;
  data: any;
  namePen: any;
  iframeContent: SafeHtml | undefined;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    const apiUrl = `http://localhost:3000/pen/getInfoPen/${this.pen_id}`;
    axios.get(apiUrl)
      .then((response) => {
        this.data = response.data;
        // console.log('Data:', this.data);
        this.namePen = (this.data.pen.name == null) ? "Chưa đặt tên" : this.data.pen.name;
        const iframeContent = `
        <html>
          <head>
            <style>${this.data.pen.css_code}</style>
          </head>
          <body>
            ${this.data.pen.html_code}
            <script>${this.data.pen.js_code}</script>
          </body>
        </html>
      `;
        this.iframeContent = this.sanitizer.bypassSecurityTrustHtml(iframeContent);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handlePageClick(): void {
    // console.log(`/pen/${this.pen_id}`);
    this.router.navigate([`/pen/${this.pen_id}`], { relativeTo: null });
  }



  user_name = "hihihi"
  informationPen = [
    "Add to Collection",
    "Remove from Pins",
    "Make Private",
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
}
