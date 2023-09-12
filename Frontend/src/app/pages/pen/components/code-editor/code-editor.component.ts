import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare let CodeMirror: any;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})

export class CodeEditorComponent implements AfterViewInit {
  @ViewChild('htmlTextarea') htmlTextarea!: ElementRef;
  @ViewChild('cssTextarea') cssTextarea!: ElementRef;
  @ViewChild('jsTextarea') jsTextarea!: ElementRef;
  @ViewChild('outputFrame') outputFrame!: ElementRef;

  htmlEditor!: any;
  cssEditor!: any;
  jsEditor!: any;

  ngAfterViewInit() {
    this.htmlEditor = CodeMirror.fromTextArea(this.htmlTextarea.nativeElement, {
      mode: 'xml',
      lineNumbers: true,
      lineWrapping: true,
      theme: 'monokai',
      autoCloseBrackets: true,
      autoCloseTags: true
    });
    this.htmlEditor.on('change', () => this.run());

    this.cssEditor = CodeMirror.fromTextArea(this.cssTextarea.nativeElement, {
      mode: 'css',
      lineNumbers: true,
      lineWrapping: true,
      theme: 'monokai',
      autoCloseBrackets: true,
      autoCloseTags: true

    });
    this.cssEditor.on('change', () => this.run());

    this.jsEditor = CodeMirror.fromTextArea(this.jsTextarea.nativeElement, {
      mode: 'javascript',
      lineNumbers: true,
      lineWrapping: true,
      theme: 'monokai',
      autoCloseBrackets: true,
      autoCloseTags: true
    });
    this.jsEditor.on('change', () => this.run());
  }

  run() {
    const htmlCode = this.htmlEditor.getValue();
    const cssCode = this.cssEditor.getValue();
    const jsCode = this.jsEditor.getValue();
    const output = this.outputFrame.nativeElement;

    // Hiển thị HTML và CSS trong iframe
    output.contentDocument.body.innerHTML = htmlCode;
    const styleTag = document.createElement('style');
    styleTag.innerHTML = cssCode;
    output.contentDocument.head.appendChild(styleTag);

    // Chạy JavaScript
    const scriptTag = document.createElement('script');
    scriptTag.innerHTML = jsCode;
    output.contentDocument.body.appendChild(scriptTag);
  }

  public isMenuOpen: boolean = false;

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
