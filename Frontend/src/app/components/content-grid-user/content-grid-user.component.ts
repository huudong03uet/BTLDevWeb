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
  @Input() pen_id: any;
  data: any;
  namePen: any;
  iframeContent: SafeHtml | undefined;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
    ) {}

  ngOnInit(): void {
    const apiUrl = `http://localhost:3000/pen/getInfoPen/${this.pen_id}`;
    axios.get(apiUrl)
    .then((response) => {
      this.data = response.data;
      console.log('Data:', this.pen_id);
      this.namePen = (this.data.pen.name == null) ? "Chưa đặt tên" : this.data.pen.name;
      const iframeContent = `
        <html>
          <head>
            <style>${this.data.pen.js_code}</style>
          </head>
          <body>
            ${this.data.pen.html_code}
            <script>${this.data.pen.css_code}</script>
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
    console.log(`/pen/${this.pen_id}`);
    this.router.navigate([`/pen/${this.pen_id}`], { relativeTo: null });
  }
}
