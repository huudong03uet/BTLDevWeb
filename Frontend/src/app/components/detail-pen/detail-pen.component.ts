import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-detail-pen',
  templateUrl: './detail-pen.component.html',
  styleUrls: ['./detail-pen.component.scss']
})
export class DetailPenComponent {
  @Output() closeDetailPen = new EventEmitter<void>();

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
    "Unfollow " + this.user_name,
  ]


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
  goToDetailPen() {
    this.router.navigate(['/pen/' + this.pen_id]);
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

//       const response = await axios.post(`http://localhost:3000/your-work/collections/`, {
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
