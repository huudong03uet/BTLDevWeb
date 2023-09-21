import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2} from '@angular/core';
import { debounce } from 'lodash';
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

}
