import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, EventEmitter, Output, OnInit, Input } from '@angular/core';
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
  @ViewChild('consoleBox') consoleBox!: ElementRef;

  @Output() webCodeChanged: EventEmitter<{ html: string; js: string; css: string; }> = new EventEmitter<{ html: string; js: string; css: string; }>();

  @Input() data: any;
  @Output() dataChange = new EventEmitter();

  htmlEditor!: any;
  stylesheetEditor!: any;
  jsEditor!: any;

  stylesheetLanguage: 'css' | 'scss' = 'css';
  debouncedRun = debounce(this.run, 1000);
  consoleMessages: string[] = [];
  showConsole = false;
  projectTitle: any;

  constructor(private cdRef: ChangeDetectorRef) { }

  @ViewChild('box1') box1!: ElementRef;
  @ViewChild('box2') box2!: ElementRef;




  ngAfterViewInit(): void {
    if(this.data && this.data.pen.type_css) {
      this.stylesheetLanguage = this.data.pen.type_css;
    }
    
    this.initializeEditors();
    // console.log(this.data)
    if(this.data) {
      if(this.data.pen.html_code) {
        this.htmlEditor.setValue(this.data.pen.html_code);
      }
      if(this.data.pen.css_code) {
        this.stylesheetEditor.setValue(this.data.pen.css_code);
      }
      if(this.data.pen.js_code) {
        this.jsEditor.setValue(this.data.pen.js_code);
      }
      this.projectTitle = this.data.pen.name;
      if(this.data.pen.type_css) {
        this.stylesheetLanguage = this.data.pen.type_css;
      }
      this.clearConsole()
      this.run();
    }


    const boxes = {
      box1: this.box1.nativeElement,
      box2: this.box2.nativeElement,
    };

    const resizers = document.getElementsByClassName('resizer');
    for (let i = 0; i < resizers.length; i++) {
      const resizer = resizers[i];
      resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);

        function resize(e: MouseEvent) {
          if (resizer.classList.contains('horizontal')) {
            resizeY(e);
          }
          e.preventDefault();
        }

            function stopResize() {
              document.removeEventListener('mousemove', resize);
            }


            function resizeY(e: MouseEvent) {
              // set the height of box1 to the current mouse positio
              
              // set order to %;
              const height = (e.clientY / window.innerHeight) * 100;
              boxes.box1.style.height = `${height}%`;
              boxes.box2.style.height = `${100 - height}%`;
            }
      });
    }
  }


  private initializeEditors() {
    this.htmlEditor = this.createEditor(this.htmlTextarea, 'xml');
    this.stylesheetEditor = this.createEditor(this.stylesheetTextarea, this.stylesheetLanguage === 'scss' ? 'sass' : 'css');
    this.jsEditor = this.createEditor(this.jsTextarea, 'javascript');
  }

  private createEditor(elementRef: ElementRef, mode: string) {
    const editor = CodeMirror.fromTextArea(elementRef.nativeElement, {
      mode,
      lineNumbers: true,
      lineWrapping: true,
      theme: 'monokai',
      autoCloseBrackets: true,
      autoCloseTags: mode === 'xml'
    });
    editor.on('keyup', () => this.debouncedRun());
    return editor;
  }

  onLanguageChange() {
    this.stylesheetEditor.setOption('mode', this.stylesheetLanguage === 'scss' ? 'sass' : 'css');
    this.data.pen.type_css = this.stylesheetLanguage;
    // console.log(this.stylesheetLanguage)
    this.dataChange.emit(this.data);
    this.run();
  }

  private run() {

    const htmlCode = this.htmlEditor.getValue();
    const stylesheetCode = this.stylesheetEditor.getValue();
    const jsCode = this.jsEditor.getValue();

    this.overrideConsole();

    const output = this.outputFrame.nativeElement.contentWindow;
    try {
      output.eval(jsCode);
    } catch (error: any) {
      this.consoleMessages.push("Error: " + error.message);
      this.scrollToBottom();
    }

    if (this.stylesheetLanguage === 'scss') {
      Sass.compile(stylesheetCode, (result: { status: number; text: string; message: any; }) => {
        if (result.status === 0) {
          this.applyStylesAndScript(htmlCode, result.text, jsCode);
        } else {
          console.error("Failed to compile SCSS:", result.message);
        }
      });
    } else {
      this.applyStylesAndScript(htmlCode, stylesheetCode, jsCode);
    }
  }

  private overrideConsole() {
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    console.log = (...args: any[]) => {
      const message = args.join(' ').trim();
      if (message) {
        this.consoleMessages.push(message);
        this.scrollToBottom();
      }
      originalConsoleLog.apply(console, args);
    };

    console.error = (...args: any[]) => {
      const message = ('Error: ' + args.join(' ')).trim();
      if (message) {
        this.consoleMessages.push(message);
        this.scrollToBottom();
      }
      originalConsoleError.apply(console, args);
    };
  }

  private scrollToBottom() {
    this.cdRef.detectChanges();
    if (this.consoleBox && this.consoleBox.nativeElement) {
      const messagesBox = this.consoleBox.nativeElement.querySelector('.messages-box');
      if (messagesBox) {
        messagesBox.scrollTop = messagesBox.scrollHeight;
      }
    }
  }
  

  toggleConsole() {
    this.showConsole = !this.showConsole;
    if (this.showConsole) {
      this.scrollToBottom();
    }
  }

  clearConsole() {
    this.consoleMessages = [];
  }

  private applyStylesAndScript(htmlCode: string, finalCssCode: string, jsCode: string) {
    const output = this.outputFrame.nativeElement;
    const outputWindow = output.contentWindow;

    outputWindow.console.log = (...args: any[]) => {
      this.consoleMessages.push(args.join(' '));
      window.console.log.apply(console, args);
    };

    outputWindow.console.error = (...args: any[]) => {
      this.consoleMessages.push('Error: ' + args.join(' '));
      window.console.error.apply(console, args);
    };

    output.contentDocument.head.innerHTML = '';
    output.contentDocument.body.innerHTML = htmlCode;

    const styleTag = document.createElement('style');
    styleTag.innerHTML = finalCssCode;
    output.contentDocument.head.appendChild(styleTag);

    const scriptTag = document.createElement('script');
    scriptTag.innerHTML = jsCode;
    output.contentDocument.body.appendChild(scriptTag);
    //thay đổi data gửi về cha
    this.data.pen.html_code = htmlCode;
    this.data.pen.css_code = finalCssCode;
    this.data.pen.js_code = jsCode;
    this.dataChange.emit(this.data);
  }
}
