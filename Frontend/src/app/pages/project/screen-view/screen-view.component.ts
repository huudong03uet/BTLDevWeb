import { Component, EventEmitter, Input, Output, OnInit, ElementRef, ViewChild, Renderer2, SimpleChanges } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { connect } from 'rxjs';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss']
})
export class ScreenViewComponent implements OnInit {
  @Input() data: any;
  @Output() dataChange = new EventEmitter();
  key_file_html: any;
  screen_choose: any;
  iframeContent: SafeHtml | undefined;
  lastContent: any;

  constructor(private renderer: Renderer2, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.updateData();
    window.addEventListener('message', (event) => {
      const href = event.data;
      if (this.key_file_html.includes(href)) {
        const content = this.getContentByKey(href);

        this.iframeContent = this.sanitizer.bypassSecurityTrustHtml(content);
      }
    }, false);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      // Kiểm tra sự thay đổi của lastContent
      if (this.lastContent !== this.getContentByKey(this.screen_choose)) {
        this.createIframe();
      }
    }
  }

  updateData() {
    this.key_file_html = this.getFileNames(this.data.data_map);
    const hasIndexHtml = this.key_file_html.includes('index.html');

    // Đặt giá trị cho screen_choose
    this.screen_choose = hasIndexHtml ? 'index.html' : (this.key_file_html.length > 0 ? this.key_file_html[0] : '');

    this.createIframe();
  }

  getFileNames(dataMap: any): string[] {
    let fileNames: string[] = [];

    for (const key in dataMap) {
      const value = dataMap[key];

      // Kiểm tra cả key và status
      if (value.type === 'file' && value.name.endsWith('.html')) {
        fileNames.push(key);
      }
    }

    return fileNames;
  }

  getContentByKey(key: string): string {
    const file = this.data.data_map[key];
    
    // Kiểm tra xem file có tồn tại và có nội dung không
    if (file && file.content) {
      let content = file.content;
      content = this.addHtmlFile(content);
      content = this.addCssJs(content);
      console.log(1233,content)
      return content;
    }
    
    return '';
  }

  addHtmlFile(content: string) : string {
    // Sử dụng biểu thức chính quy để tìm tất cả các thẻ có thuộc tính href
    const regex = /<a\s[^>]*href\s*=\s*['"]([^'"]*)['"][^>]*>/g;

  
    let match = regex.exec(content);
    while (match !== null) {
      // const tag = match[1];
      const href = match[1];
      console.log(match)
      // Kiểm tra xem href có nằm trong key_file_html hay không
      if (this.key_file_html.includes(href)) {
        // Thêm sự kiện onclick vào thẻ
        const replacement = `<a href="${href}" onclick="handleClick('${href}')">`
        content = content.replace(match[0], replacement);
      }
      
      match = regex.exec(content);
    }
  
    // Thêm hàm vào nội dung của iframe
    content = `<script>
                  function handleClick(href) {
                    event.preventDefault();
                    window.parent.postMessage(href, '*');
                  }
                </script>` + content;
  
    return content;
  }
  

  addCssJs(content: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
  
    // Chuyển đổi NodeList thành mảng
    const linkElements = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));
    console.log('linkcss', linkElements)
  
    for (const linkElement of linkElements) {
      let href = linkElement.getAttribute('href');
      if(href != null) {
        href = this.toAbsolutePath(this.screen_choose, href);
      }

      // Kiểm tra xem href có nằm trong key_file_html hay không
      if (href && this.data.data_map[href] != null) {
        // Lấy nội dung từ this.data.data_map[key].content thay vì fetch từ server
        const cssContent = this.data.data_map[href]?.content || '';
        
  
        // Tạo một thẻ <style> mới với nội dung CSS
        const styleElement = doc.createElement('style');
        styleElement.textContent = cssContent;
  
        // Thay thế thẻ <link> bằng thẻ <style>
        if (linkElement.parentNode) {
          linkElement.parentNode.replaceChild(styleElement, linkElement);
        }      
      }
    }
  
    // Chuyển NodeList thành mảng
    const scriptElements = Array.from(doc.querySelectorAll('script[src]'));
    console.log('script',scriptElements);
  
    for (const scriptElement of scriptElements) {
      let src = scriptElement.getAttribute('src');
  
      if(src != null) {
        src = this.toAbsolutePath(this.screen_choose, src);
      }
      // Kiểm tra xem src có nằm trong key_file_html hay không
      if (src&&this.data.data_map[src]!=null) {
        
        // Lấy nội dung từ this.data.data_map[key].content thay vì fetch từ server
        const jsContent = this.data.data_map[src]?.content || '';
  
        // Tạo một thẻ <script> mới với nội dung JavaScript
        const newScriptElement = doc.createElement('script');
        newScriptElement.textContent = jsContent;
  
        // Thay thế thẻ <script> cũ bằng thẻ <script> mới
        if (scriptElement.parentNode) {
          scriptElement.parentNode.replaceChild(newScriptElement, scriptElement);
        }      
      }
    }
  
    // Chuyển Document trở lại thành chuỗi HTML
    const newHtmlString = new XMLSerializer().serializeToString(doc);
    return newHtmlString;
  }
  
  
  getCssContentByUrl(url: string): string {
    return this.data.data_map[url].content;
  }

  onScreenChooseChange() {
    this.createIframe();
  }

  toAbsolutePath(currentPath: string, href: string) {
    // Kiểm tra xem đường dẫn href có bắt đầu bằng './' không

    // Tách đường dẫn hiện tại thành các phần tử
    let pathParts = currentPath.split('/');
    pathParts.pop();
    console.log('path', pathParts)
    
    // Xử lý đường dẫn href
    let hrefParts = href.split('/');
    
    for (let part of hrefParts) {
        if (part === '.') {
            continue;
        } else if (part === '..') {
            if (pathParts.length) {
                pathParts.pop();
            } else {
                return null;
            }
        } else {
            pathParts.push(part);
        }
    }

    // Trả về đường dẫn tuyệt đối
    return pathParts.join('/');
}

  

  createIframe() {
    const content = this.getContentByKey(this.screen_choose);

    if (content) {
      this.iframeContent = this.sanitizer.bypassSecurityTrustHtml(content);

      console.log(content, 1234342)

      // Cập nhật lastContent
      this.lastContent = content;
    } else {
      this.iframeContent = undefined;
    }
  }
}
