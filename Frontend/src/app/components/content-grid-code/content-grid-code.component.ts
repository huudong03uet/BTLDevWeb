import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-content-grid-code',
  templateUrl: './content-grid-code.component.html',
  styleUrls: ['./content-grid-code.component.scss']
})
export class ContentGridCodeComponent implements OnInit {
  @Input() pen_id: any;
  data: any;
  namePen: any;
  iframeContent: SafeHtml | undefined;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    ) {}

  ngOnInit(): void {
    const apiUrl = `http://localhost:3000/pen/getInfoPen/${this.pen_id}`;
    axios.get(apiUrl)
    .then((response) => {
      this.data = response.data;
      console.log('Data:', this.data);
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
    console.log(`/pen/${this.pen_id}`);
    this.router.navigate([`/pen/${this.pen_id}`], { relativeTo: null });
  }
}
