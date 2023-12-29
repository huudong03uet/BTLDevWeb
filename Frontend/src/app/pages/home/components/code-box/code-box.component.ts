import { Component, Input } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
declare let CodeMirror: any;

@Component({
  selector: 'app-code-box',
  templateUrl: './code-box.component.html',
  styleUrls: ['./code-box.component.scss']
})
export class CodeBoxComponent {
  @Input() codeObject!: string;
  @ViewChild('htmlTextarea') htmlTextarea!: ElementRef;
  @ViewChild('cssTextarea') cssTextarea!: ElementRef;
  // scss
  // @ViewChild('scssTextarea') scssTextarea!: ElementRef;
  @ViewChild('jsTextarea') jsTextarea!: ElementRef;
  @ViewChild('outputFrame') outputFrame!: ElementRef;

  htmlEditor!: any;
  cssEditor!: any;
  jsEditor!: any;
  // scssEditor!: any;

  ngAfterViewInit() {
    this.htmlEditor = CodeMirror.fromTextArea(this.htmlTextarea.nativeElement, {
      mode: 'xml',
      lineNumbers: false,
      lineWrapping: true,
      theme: 'monokai',
      autoCloseBrackets: true,
      autoCloseTags: true,
      // only read
      readOnly: true
    });
    this.htmlEditor.on('change', () => this.run());

    this.cssEditor = CodeMirror.fromTextArea(this.cssTextarea.nativeElement, {
      mode: 'css',
      lineNumbers: false,
      lineWrapping: true,
      theme: 'monokai',
      autoCloseBrackets: true,
      autoCloseTags: true,
      readOnly: true

    });
    this.cssEditor.on('change', () => this.run());

    
    

    this.jsEditor = CodeMirror.fromTextArea(this.jsTextarea.nativeElement, {
      mode: 'javascript',
      lineNumbers: false,
      lineWrapping: true,
      theme: 'monokai',
      autoCloseBrackets: true,
      autoCloseTags: true,
      readOnly: true
    });
    this.jsEditor.on('change', () => this.run());

    // this.scssEditor = CodeMirror.fromTextArea(this.scssTextarea.nativeElement, {
    //   mode: 'scss',
    //   lineNumbers: false,
    //   lineWrapping: true,
    //   theme: 'monokai',
    //   autoCloseBrackets: true,
    //   autoCloseTags: true,
    //   readOnly: true
    // });
  }

  run() {
    const htmlCode = this.htmlEditor.getValue();
    const cssCode = this.cssEditor.getValue();
    const jsCode = this.jsEditor.getValue();
    const output = this.outputFrame.nativeElement;

    // const scssCode = this.scssEditor.getValue();

    // Hiển thị HTML và CSS trong iframe
    output.contentDocument.body.innerHTML = htmlCode;
    const styleTag = document.createElement('style');
    styleTag.innerHTML = cssCode;
    output.contentDocument.head.appendChild(styleTag);

    // Hiển thị SCSS trong iframe
    // const styleTagSCSS = document.createElement('style');
    // styleTagSCSS.innerHTML = scssCode;
    // output.contentDocument.head.appendChild(styleTagSCSS);


    // Chạy JavaScript
    const scriptTag = document.createElement('script');
    scriptTag.innerHTML = jsCode;
    output.contentDocument.body.appendChild(scriptTag);
  }

  

}
