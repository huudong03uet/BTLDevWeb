import { Component, EventEmitter, HostListener, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';

import { HostService } from 'src/app/host.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-detail-pen',
  templateUrl: './detail-pen.component.html',
  styleUrls: ['./detail-pen.component.scss']
})
export class DetailPenComponent {
  @Output() closeDetailPen = new EventEmitter<void>();
  @Input() type: string = "pen";
  @Input() pen_id: any = 0;
  data: any;
  namePen: any;
  iframeContent: SafeHtml | undefined;

  htmlFile = "nulls"
  cssFile = "nulls"
  jsFile = "nulls"


  ngOnInit(): void {
    if (this.type == 'pen') {
      let apiUrl = this.myService.getApiHost() + `/pen/getInfoPen?user_id=${null}&pen_id=${this.pen_id}`;
      axios.get(apiUrl).then((response) => {
        this.data = response.data;
        this.htmlFile = this.data.pen.html_code;
        this.cssFile = this.data.pen.css_code;
        this.jsFile = this.data.pen.js_code;

        this.namePen = (this.data.pen.name == null) ? "Untitled" : this.data.pen.name;
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
      }).catch((error) => {
        console.error('Error:', error);
      });
    } else if (this.type == 'project') {
      console.log("project:", this.pen_id)
    }

  }


  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private myService: HostService,
    private userData: UserDataService,
  ) { }


  handlePageClick(): void {
    if (this.type == 'pen') {
      this.router.navigate([`/pen/${this.pen_id}`], { relativeTo: null });
    } else if (this.type == 'project') {
      this.router.navigate([`/project/${this.pen_id}`], { relativeTo: null });
    } else if (this.type == 'collection') {
      this.router.navigate([`/collection/${this.pen_id}`], { relativeTo: null });
    }

  }



  user_name = ""
  informationPen = [
    "Add to Collection",
    "Remove from Pins",
    "Unfollow " + this.user_name,
  ]
  handleLikeClick() {
    if (this.userData.getUserData() == null) {
      this.router.navigate([`/login`]);
    }
    const url =  this.myService.getApiHost() + `/grid/handleLike?pen_id=${this.data.pen.pen_id}&user_id=${this.userData.getUserData()?.user_id}&type=pen`;

    axios.get(url).then((response) => {

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


  onCloseCreateNewCollection() {
    this.closeDetailPen.emit();
  }

  outOfCenter: boolean = false;

  isOutOfCenter() {
    this.outOfCenter = true;
  }

  isInOfCenter() {
    this.outOfCenter = false;
  }

  checkOutDetailPen() {
    console.log("checkOutDetailPen" + this.outOfCenter)
    if (this.outOfCenter) {
      this.onCloseCreateNewCollection();
    }
  }

  hasInformationPen = false;
  randomNumber = Math.floor(Math.random() * 10000000);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    if (this.hasInformationPen == true) {
      var x = document.getElementsByClassName("list-items");
      if (x != null) {
        for (let i = 0; i < x.length; i++) {
          if (x.item(i)!.classList.contains(this.randomNumber.toString())) {
            if (x.item(i)!.classList.contains("show")) {
              x.item(i)!.classList.remove("show");
              this.hasInformationPen = false;
            }
          }
        }
      }
    }


  }

  onClickInformationPen() {
    var x = document.getElementsByClassName("list-items");
    if (x != null) {
      for (let i = 0; i < x.length; i++) {
        if (x.item(i)!.classList.contains(this.randomNumber.toString())) {
          if (x.item(i)!.classList.contains("show")) {
            x.item(i)!.classList.remove("show");
            this.hasInformationPen = false;
          } else {
            x.item(i)!.classList.add("show");
            this.hasInformationPen = true;
          }

        }
      }
    }
  }
  goToDetailPen() {
    this.router.navigate(['/pen/' + this.pen_id]);
  }
  tinh_nang_vo_dung: boolean = false;

  objectView = 'html'
  clickHTML() {
    this.objectView = 'html'
    this.tinh_nang_vo_dung = !this.tinh_nang_vo_dung
    // add html-button -> active

    document.getElementsByClassName("html-button")?.item(0)?.classList.add("active");
    // remove css-button -> active
    document.getElementsByClassName("css-button")?.item(0)?.classList.remove("active");
    // remove js-button -> active
    document.getElementsByClassName("js-button")?.item(0)?.classList.remove("active");
  }

  clickCSS() {
    this.objectView = 'css'
    this.tinh_nang_vo_dung = !this.tinh_nang_vo_dung
    document.getElementsByClassName("css-button")?.item(0)?.classList.add("active");
    document.getElementsByClassName("html-button")?.item(0)?.classList.remove("active");
    document.getElementsByClassName("js-button")?.item(0)?.classList.remove("active");
  }

  clickJS() {
    this.objectView = 'js'
    this.tinh_nang_vo_dung = !this.tinh_nang_vo_dung
    document.getElementsByClassName("js-button")?.item(0)?.classList.add("active");
    document.getElementsByClassName("css-button")?.item(0)?.classList.remove("active");
    document.getElementsByClassName("html-button")?.item(0)?.classList.remove("active");
  }

}



// async onSubmit() {
//   if (this.createForm.valid) {
//     try {
//       const user = this.userData.getUserData();
//       const userId = user?.user_id;

//       if (!userId) {
//         console.error('User ID not available.');
//         return;
//       }
// let url = this.myService.getApiHost() + '/your-work/collections';
//       const response = await axios.post(url, {
//         name: this.createForm.value.collectionTitle,
//         user_id: userId,
//         // Add other fields if needed
//       });

//       console.log('Collection created successfully:', response.data.collection);

//       this.createForm.reset();
//       this.onCloseCreateNewCollection();
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         console.error('Error creating collection:', error);
//         const errorMessage = (error as AxiosError<{ error?: string }>).response?.data?.error;
//         console.error('Error message:', errorMessage || 'Unknown error');
//       } else {
//         console.error('Error creating collection:', error);
//       }
//     }
//   }
// }
