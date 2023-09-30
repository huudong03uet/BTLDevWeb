import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2, OnInit, Input } from '@angular/core';
import { debounce } from 'lodash';
import { Pen } from 'src/app/models/pen';
declare let CodeMirror: any;
declare let Sass: any;


@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})

export class CodeEditorComponent implements AfterViewInit {


  @ViewChild('htmlTextarea') htmlTextarea!: ElementRef;
  @ViewChild('stylesheetTextarea') stylesheetTextarea!: ElementRef;
  @ViewChild('jsTextarea') jsTextarea!: ElementRef;
  @ViewChild('outputFrame') outputFrame!: ElementRef;

  htmlEditor!: any;
  stylesheetEditor!: any;
  jsEditor!: any;


  stylesheetLanguage: 'css' | 'scss' = 'css';  // Default is 'css'

  debouncedRun = debounce(this.run, 300); // 300ms delay

  private isResizing = false;
  private startY = 0;
  private startHeightInput = 0;
  private startHeightOutput = 0;

  @ViewChild('inputSection', { static: false }) inputSection!: ElementRef;
  @ViewChild('resizer', { static: false }) resizer!: ElementRef;
  @ViewChild('outputSection', { static: false }) outputSection!: ElementRef;

  constructor(private renderer: Renderer2) { }
  private boundPerformResize: any;
  private boundStopResizing: any;

  ngAfterViewInit() {
    this.htmlEditor = CodeMirror.fromTextArea(this.htmlTextarea.nativeElement, {
      mode: 'xml',
      lineNumbers: true,
      lineWrapping: true,
      theme: 'monokai',
      autoCloseBrackets: true,
      autoCloseTags: true
    });
    this.htmlEditor.on('keyup', () => this.debouncedRun());

    this.stylesheetEditor = CodeMirror.fromTextArea(this.stylesheetTextarea.nativeElement, {
      mode: this.stylesheetLanguage === 'scss' ? 'sass' : 'css',
      lineNumbers: true,
      lineWrapping: true,
      theme: 'monokai',
      autoCloseBrackets: true
    });
    this.stylesheetEditor.on('keyup', () => this.debouncedRun());

    this.jsEditor = CodeMirror.fromTextArea(this.jsTextarea.nativeElement, {
      mode: 'javascript',
      lineNumbers: true,
      lineWrapping: true,
      theme: 'monokai',
      autoCloseBrackets: true,
      autoCloseTags: true
    });
    this.jsEditor.on('keyup', () => this.debouncedRun());

    this.boundPerformResize = this.performResize.bind(this);
    this.boundStopResizing = this.stopResizing.bind(this);

    if (this.resizer && this.resizer.nativeElement) {
      this.resizer.nativeElement.addEventListener('mousedown', (event: MouseEvent) => {
        console.log("mousedown on resizer"); // Thêm log này để kiểm tra
        this.startResizing(event);
      });
    }
  }


  startResizing(event: MouseEvent) {
    event.stopPropagation();
    this.isResizing = true;
    this.startY = event.clientY;
    this.startHeightInput = this.inputSection.nativeElement.offsetHeight;
    this.startHeightOutput = this.outputSection.nativeElement.offsetHeight;
    document.body.style.overflow = "hidden"; // Ngăn chặn cuộn

    this.renderer.setStyle(this.resizer.nativeElement, 'z-index', '9999');

    document.addEventListener('mousemove', this.boundPerformResize);
    document.addEventListener('mouseup', this.boundStopResizing);

    let overlay = this.renderer.createElement('div');
    this.renderer.addClass(overlay, 'resizing-overlay');
    this.renderer.appendChild(document.body, overlay);
  }

  stopResizing() {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.boundPerformResize);
    document.removeEventListener('mouseup', this.boundStopResizing);
    this.renderer.setStyle(this.resizer.nativeElement, 'z-index', 'auto');
    let overlay = document.querySelector('.resizing-overlay');
    if (overlay) {
      this.renderer.removeChild(document.body, overlay);
    }
    document.body.style.overflow = "auto"; // Cho phép cuộn lại
  }


  performResize(event: MouseEvent) {
    if (this.isResizing) {
        const movementY = event.clientY - this.startY;
        let newHeightInput = this.startHeightInput + movementY;
        let newHeightOutput = this.startHeightOutput - movementY;

        const windowHeight = window.innerHeight;
        if (newHeightInput > 400) {
            newHeightInput = 400;
            newHeightOutput = windowHeight - 400; 
        } else if (newHeightOutput < 0) { 
            newHeightOutput = 0;
            newHeightInput = windowHeight;
        }

        event.preventDefault();

        // Đặt chiều cao mới cho input section và output section
        this.renderer.setStyle(this.inputSection.nativeElement, 'height', `${newHeightInput}px`);
        this.renderer.setStyle(this.outputSection.nativeElement, 'height', `${newHeightOutput}px`);

        // Cập nhật chiều cao của textarea dựa trên chiều cao mới của input section và chiều cao của label
        const labelHeight = this.htmlEditor.getWrapperElement().previousElementSibling.offsetHeight;
        const textareaNewHeight = newHeightInput - labelHeight; // Đây là chiều cao mới của textarea
        this.renderer.setStyle(this.htmlTextarea.nativeElement, 'height', `${textareaNewHeight}px`);
        this.renderer.setStyle(this.stylesheetTextarea.nativeElement, 'height', `${textareaNewHeight}px`);
        this.renderer.setStyle(this.jsTextarea.nativeElement, 'height', `${textareaNewHeight}px`);

        // Di chuyển resizer tới vị trí Y của chuột
        this.renderer.setStyle(this.resizer.nativeElement, 'top', `${event.clientY}px`);
    }
}



  onLanguageChange() {
    this.stylesheetEditor.setOption('mode', this.stylesheetLanguage === 'scss' ? 'sass' : 'css');
    this.run(); // Tùy vào bạn có muốn chạy lại biên dịch ngay sau khi thay đổi ngôn ngữ hay không.
  }

  run() {
    const htmlCode = this.htmlEditor.getValue();
    const stylesheetCode = this.stylesheetEditor.getValue();
    const jsCode = this.jsEditor.getValue();

    if (this.stylesheetLanguage === 'scss') {
      // Compile SCSS to CSS
      Sass.compile(stylesheetCode, (result: { status: number; text: string; message: any; }) => {
        if (result.status === 0) { // Success
          this.applyStylesAndScript(htmlCode, result.text, jsCode);
        } else {
          console.error("Failed to compile SCSS:", result.message);
        }
      });
    } else {
      this.applyStylesAndScript(htmlCode, stylesheetCode, jsCode);
    }
  }

  applyStylesAndScript(htmlCode: string, finalCssCode: string, jsCode: string) {
    const output = this.outputFrame.nativeElement;

    // Clear previous content
    output.contentDocument.head.innerHTML = '';
    output.contentDocument.body.innerHTML = '';

    output.contentDocument.body.innerHTML = htmlCode;

    const styleTag = document.createElement('style');
    styleTag.innerHTML = finalCssCode;
    output.contentDocument.head.appendChild(styleTag);

    const scriptTag = document.createElement('script');
    scriptTag.innerHTML = jsCode;
    output.contentDocument.body.appendChild(scriptTag);
  }

  getData() {
    const htmlCode = this.htmlEditor.getValue();
    const stylesheetCode = this.stylesheetEditor.getValue();
    const jsCode = this.jsEditor.getValue();
    return {htmlCode, stylesheetCode, jsCode};
  }

  setPen(dataPen: Pen) {
    console.log(dataPen);
    console.log(123445)
    this.htmlEditor.setValue(dataPen.html_code)
    this.stylesheetEditor.setValue(dataPen.css_code)
    this.jsEditor.setValue(dataPen.js_code)
  }

}
