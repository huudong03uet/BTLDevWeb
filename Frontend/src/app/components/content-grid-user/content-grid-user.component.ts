import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-content-grid-user',
  templateUrl: './content-grid-user.component.html',
  styleUrls: ['./content-grid-user.component.scss']
})
export class ContentGridUserComponent implements OnInit {
  @Input() user: any;
  data: any;
  name: any;
  iframeContent_1: SafeHtml | undefined;
  iframeContent_2: SafeHtml | undefined;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    for (let idx = 0; idx < this.user.length; ++idx) {
      this.name = this.user[idx].user_name;
      const apiUrl = `http://localhost:3000/pen/getPenByUserIDForFollow/${this.user[idx].user_id}`;
      axios.get(apiUrl).then((response) => {
        this.data = response.data;
        // console.log('user_id:', this.user[idx].user_id);
        // console.log('data_pen:', this.data);
        if(this.data == null){
          return;
        }
        const iframeContent_1 = `
        <html>
          <head>
            <style>${this.data[0].css_code}</style>
          </head>
          <body>
            ${this.data[0].html_code}
            <script>${this.data[0].js_code}</script>
          </body>
        </html>
      `;
        this.iframeContent_1 = this.sanitizer.bypassSecurityTrustHtml(iframeContent_1);

        const iframeContent_2 = `
        <html>
          <head>
            <style>${this.data[1].css_code}</style>
          </head>
          <body>
            ${this.data[1].html_code}
            <script>${this.data[1].js_code}</script>
          </body>
        </html>
      `;
        this.iframeContent_2 = this.sanitizer.bypassSecurityTrustHtml(iframeContent_2);
      }).catch((error) => {
        console.error('Error:', error);
      });
    }

  }

  handlePageClick(): void {
    // console.log(`/pen/${this.pen_id}`);
    this.router.navigate([`/pen/${this.data.pen_id}`], { relativeTo: null });
  }
}
