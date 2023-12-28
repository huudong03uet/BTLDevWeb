import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-folder-tree',
  templateUrl: './folder-tree.component.html',
  styleUrls: ['./folder-tree.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FolderTreeComponent {
  @Input() project_id: number | undefined;

  project_name: string = "File Manager";

  datas = [


    {
      id: 2,
      title: "test_folder",
      type: "folder",
      code: "",
      children: [
        {
          id: 3,
          title: "test_file.css",
          type: "css",
          code: "body { background-color: red; }",
          children: []
        },
        {
          id: 4,
          title: "test_file.html",
          type: "html",
          code: "<h1>Hello World</h1>",
          children: []
        },
        {
          id: 5,
          title: "test_file.js",
          type: "js",
          code: "console.log('Hello World');",
          children: []
        }
      ] 
    },
    {
      id: 6,
      title: "test_file",
      type: "folder",
      code: "console.log('Hello World');",
      children: []
    },
    {
      id: 7,
      title: "test_file.png",
      type: "png",
      code: "",
      children: []
    },
  ]
  constructor(private sanitizer: DomSanitizer) { }


  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  renderTree(obj: any) {
    // random number for id_ref
    let html = `<ul>`;
    for (let i = 0; i < obj.length; i++) {

      html += `<li class="${obj[i].type}" id="${obj[i].id}">`;
      html += (this.renderSvg(obj[i].type));
      html += `<span>${obj[i].title}</span>`;
      if (obj[i].children.length > 0) {
        html += this.renderTree(obj[i].children);
      }
      html += `</li>`;
    }
    html += `</ul>`;

    // return html;
    // return html has svg
    return html;


  }

  renderSvg(obj: string) {
    if (obj == "folder") {
      return `<svg class="icon icon-folder" viewBox="0 0 23 15"><path d="M2.004 14.458A1.88 1.88 0 0 1 .125 12.58V1.31C.125.655.656.124 1.31.124h4.964c.452 0 .858.25 1.06.655l.317.635c.245.49.736.793 1.283.793h9.896a1.88 1.88 0 0 1 1.878 1.879v8.493a1.88 1.88 0 0 1-1.878 1.878H2.004z" fill="#CBCBCB"></path><path class="folder-front" d="M2.004 14.458A1.88 1.88 0 0 1 .125 12.58V4.087a1.88 1.88 0 0 1 1.879-1.879H18.83a1.88 1.88 0 0 1 1.878 1.879v8.493a1.88 1.88 0 0 1-1.878 1.878H2.004z" fill="#828282"></path></svg>`
    } else if (obj == "html" || obj == "htm") {
      return `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" rx="5" fill="#FF3C41"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M21.325 13.893a1.75 1.75 0 0 0-2.65-2.286l-11 12.75a1.75 1.75 0 0 0 0 2.286l11 12.75a1.75 1.75 0 0 0 2.65-2.286L11.311 25.5l10.014-11.607Zm7.35 0a1.75 1.75 0 0 1 2.65-2.286l11 12.75a1.75 1.75 0 0 1 0 2.286l-11 12.75a1.75 1.75 0 0 1-2.65-2.286L38.689 25.5 28.675 13.893Z" fill="#282828"></path></svg>`
    } else if (obj == "css" || obj == "scss" || obj == "sass") {
      return `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" rx="5" fill="#0EBEFF"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="m27.175 28.711 7.786 4.565a2.11 2.11 0 0 0 1.604.212 2.143 2.143 0 0 0 1.291-.988 2.203 2.203 0 0 0 .198-1.63 2.17 2.17 0 0 0-.983-1.306L29.285 25l7.787-4.564a2.17 2.17 0 0 0 .982-1.305 2.203 2.203 0 0 0-.198-1.631 2.143 2.143 0 0 0-1.291-.988 2.11 2.11 0 0 0-1.604.212l-7.786 4.565V12.16a2.19 2.19 0 0 0-.621-1.518 2.124 2.124 0 0 0-1.49-.642c-1.13 0-2.11.964-2.11 2.156v9.133l-7.786-4.565a2.11 2.11 0 0 0-1.604-.212c-.54.145-1.005.5-1.291.988a2.202 2.202 0 0 0-.198 1.63c.147.55.5 1.018.983 1.306L20.844 25l-7.786 4.564a2.168 2.168 0 0 0-.983 1.305 2.202 2.202 0 0 0 .198 1.631 2.122 2.122 0 0 0 2.895.776l7.786-4.565v9.129c0 1.161.946 2.16 2.11 2.16 1.132 0 2.11-.964 2.11-2.156v-9.133Z" fill="#282828"></path></svg>`
    } else if (obj == "js" || obj == "ts") {
      return `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" rx="5" fill="#FFDD40"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M22.263 11.845c0 .89-.633 1.654-1.506 1.81-4 .724-7.067 5.367-7.067 10.917s3.067 10.19 7.067 10.914a1.847 1.847 0 0 1-.684 3.623C14.297 38.035 10 31.859 10 24.572c0-7.29 4.297-13.466 10.073-14.54a1.846 1.846 0 0 1 2.19 1.813Zm6.307 0a1.85 1.85 0 0 1 2.19-1.813c5.777 1.073 10.073 7.25 10.073 14.54 0 7.287-4.296 13.467-10.073 14.537a1.846 1.846 0 0 1-.683-3.623c4-.724 7.066-5.367 7.066-10.914 0-5.55-3.066-10.193-7.066-10.916a1.836 1.836 0 0 1-1.507-1.81Z" fill="#282828"></path></svg>`
    } else if (obj == "png" || obj == "jpg" || obj == "jpeg" || obj == "gif") {
      return `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" rx="5" fill="#FFDD40"></rect><rect width="50" height="50" rx="5" fill="#FF3C41" fill-opacity="0.25"></rect><path d="M30.833 21.667a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" fill="#000"></path><path d="M10 13.333A3.333 3.333 0 0 1 13.333 10h23.334A3.333 3.333 0 0 1 40 13.333v23.334A3.333 3.333 0 0 1 36.667 40H13.333A3.333 3.333 0 0 1 10 36.667V13.333Zm26.667 0H13.333v13.2l5.626-4.501a1.667 1.667 0 0 1 2.082 0l7.169 5.735 2.278-2.279a1.668 1.668 0 0 1 2.357 0l3.822 3.822V13.333Z" fill="#000"></path></svg>`
    } else if (obj == "ttf" || obj == "otf" || obj == "woff" || obj == "woff2") {
      return `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" rx="5" fill="#0EBEFF"></rect><rect width="50" height="50" rx="5" fill="#AE63E4" fill-opacity="0.75"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M33.6 39a2.8 2.8 0 0 0 2.8-2.8V16.6L30.8 11h-14a2.8 2.8 0 0 0-2.8 2.8v22.4a2.8 2.8 0 0 0 2.8 2.8h16.8Zm-2.8-18.2a1.4 1.4 0 1 0 0-2.8H19.6a1.4 1.4 0 1 0 0 2.8h11.2Zm1.4 4.2a1.4 1.4 0 0 1-1.4 1.4H19.6a1.4 1.4 0 1 1 0-2.8h11.2a1.4 1.4 0 0 1 1.4 1.4Zm-1.4 7a1.4 1.4 0 1 0 0-2.8H19.6a1.4 1.4 0 1 0 0 2.8h11.2Z" fill="#000"></path></svg>`
    }
    return `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" rx="5" fill="#FFDD40"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M22.263 11.845c0 .89-.633 1.654-1.506 1.81-4 .724-7.067 5.367-7.067 10.917s3.067 10.19 7.067 10.914a1.847 1.847 0 0 1-.684 3.623C14.297 38.035 10 31.859 10 24.572c0-7.29 4.297-13.466 10.073-14.54a1.846 1.846 0 0 1 2.19 1.813Zm6.307 0a1.85 1.85 0 0 1 2.19-1.813c5.777 1.073 10.073 7.25 10.073 14.54 0 7.287-4.296 13.467-10.073 14.537a1.846 1.846 0 0 1-.683-3.623c4-.724 7.066-5.367 7.066-10.914 0-5.55-3.066-10.193-7.066-10.916a1.836 1.836 0 0 1-1.507-1.81Z" fill="#282828"></path></svg>`
  }
}

