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
  screen_choose: any;
  iframeContent: SafeHtml | undefined;
  lastContent: any;

  constructor(private renderer: Renderer2, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.updateData();
    window.addEventListener('message', (event) => {
      const href = event.data;
      if (this.data.key_file_html.has(href)) {
        const content = this.getContentByKey(href);
        console.log(content)
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
      if (!this.data.key_file_html.has(this.screen_choose)) {
        if(this.data.fileChoose && this.data.key_file_html.has(this.data.fileChoose)) {
          this.screen_choose = this.data.fileChoose;
        } else if(this.data.key_file_html.size>0) {
          let myArray = Array.from(this.data.key_file_html);

          // Lấy phần tử đầu tiên
          let firstElement = myArray[0];

          this.screen_choose = firstElement;
        } else {
          this.screen_choose = null;
        }
        this.createIframe();
      } 
    }
  }

  updateData() {
    const hasIndexHtml = this.data.key_file_html.has('index.html');

    // Đặt giá trị cho screen_choose
    this.screen_choose = hasIndexHtml ? 'index.html' : (this.data.key_file_html.length > 0 ? this.data.key_file_html[0] : '');

    this.createIframe();
  }


  getContentByKey(key: string): string {
    const file = this.data.data_map[key];
    
    // Kiểm tra xem file có tồn tại và có nội dung không
    if (file && file.content) {
      console.log(file.content);
      let content = file.content;
      content = this.addHtmlFile(content, key);
      content = this.addCssJs(content, key);
      return content;
    }
    
    return '';
  }

  addHtmlFile(content: string, key: string) : string {
    // Sử dụng biểu thức chính quy để tìm tất cả các thẻ có thuộc tính href
    const regex = /<a\s[^>]*href\s*=\s*['"]([^'"]*)['"][^>]*>/g;

  
    let match = regex.exec(content);
    while (match !== null) {
      // const tag = match[1];
      let href = match[1];
      if(href!=null) {
          const file_name = this.toAbsolutePath(key, href);
        

        // Kiểm tra xem href có nằm trong data.key_file_html hay không
        if (this.data.key_file_html.has(file_name)) {
          // Thêm sự kiện onclick vào thẻ
          const replacement = `<a href="${file_name}" onclick="handleClick('${file_name}')">`
          content = content.replace(match[0], replacement);
        }
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

  addIframeHtml(content: string, key: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // Chuyển NodeList thành mảng
    const iframeElements = Array.from(doc.querySelectorAll('iframe[src]'));
    console.log('iframe', iframeElements);

    for (const iframeElement of iframeElements) {
      let src = iframeElement.getAttribute('src');

      if(src != null) {
        src = this.toAbsolutePath(this.screen_choose, src);
      }
      // Kiểm tra xem src có nằm trong data.key_file_html hay không
      if (src && this.data.data_map[src] != null) {
        
        // Lấy nội dung từ this.data.data_map[key].content thay vì fetch từ server
        const htmlContent = this.data.data_map[src]?.content || '';

        // Tạo một thẻ <div> mới với nội dung HTML
        const newDivElement = doc.createElement('div');
        newDivElement.innerHTML = htmlContent;

        // Thay thế thẻ <iframe> cũ bằng thẻ <div> mới
        if (iframeElement.parentNode) {
          iframeElement.parentNode.replaceChild(newDivElement, iframeElement);
        }      
      }
    }
    return content;
  }

  addCssJs(content: string, key: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
  
    // Chuyển đổi NodeList thành mảng
    const linkElements = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));
    console.log('linkcss', linkElements)
  
    for (const linkElement of linkElements) {
      let href = linkElement.getAttribute('href');
      if(href != null) {
        href = this.toAbsolutePath(key, href);
      }

      // Kiểm tra xem href có nằm trong data.key_file_html hay không
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
        src = this.toAbsolutePath(key, src);
      }
      // Kiểm tra xem src có nằm trong data.key_file_html hay không
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
