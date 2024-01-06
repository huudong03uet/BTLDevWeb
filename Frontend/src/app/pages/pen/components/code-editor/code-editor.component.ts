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
  // consoleMessages: string[] = [];
  showConsole = false;
  projectTitle: any;

  constructor(private cdRef: ChangeDetectorRef) { }

  @ViewChild('box1') box1!: ElementRef;
  @ViewChild('box2') box2!: ElementRef;
  last_log_out: string = "";

  last_log_in: string = "";

  ngOnInit(): void {

  }

  @ViewChild('consoleInput') consoleInput: ElementRef | undefined;
  @ViewChild('historyContainer') historyContainer: ElementRef | undefined;

  storeCode: string[] = [];
  addResult(inputAsString: string, output: string) {
    console.log("1 lan chay", inputAsString, output)
    if (this.last_log_out === output || this.last_log_in === inputAsString) return;
    this.last_log_out = output;
    this.last_log_in = inputAsString;

    const outputAsString =
      Array.isArray(output) ? `[${output.join(", ")}]` : output.toString();
    const inputLogElement = document.createElement("div");
    const outputLogElement = document.createElement("div");

    inputLogElement.classList.add("console-input-log");
    outputLogElement.classList.add("console-output-log");


    // set color for input and output
    if (outputAsString.includes("Error:")) {
      outputLogElement.style.backgroundColor = "rgba(255,0,0,.2)"
    } else {
      outputLogElement.style.color = "#00ffcc";
    }    
  

    inputLogElement.textContent = `> ${inputAsString}`;
    outputLogElement.textContent = outputAsString;

    if (this.historyContainer && this.historyContainer.nativeElement) {
      this.historyContainer.nativeElement.appendChild(inputLogElement);
      this.historyContainer.nativeElement.appendChild(outputLogElement);
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
  ngAfterViewInit(): void {
    if (this.data && this.data.pen.type_css) {
      this.stylesheetLanguage = this.data.pen.type_css;
    }

    this.initializeEditors();
    // console.log(this.data)
    if (this.data) {
      if (this.data.pen.html_code) {
        this.htmlEditor.setValue(this.data.pen.html_code);
      }
      if (this.data.pen.css_code) {
        this.stylesheetEditor.setValue(this.data.pen.css_code);
      }
      if (this.data.pen.js_code) {
        this.jsEditor.setValue(this.data.pen.js_code);
      }
      this.projectTitle = this.data.pen.name;
      if (this.data.pen.type_css) {
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

    console.log("123", this.consoleInput)
    this.consoleInput?.nativeElement.addEventListener("keyup", (e: KeyboardEvent) => {

      if (e.key === "Enter") {
        const code = this.consoleInput?.nativeElement.value;
        if (code.length === 0) return;
    
        try {
          console.log("1 lan chay", code, eval(code))
          this.addResult(code, eval(code));
        } catch (error: any) {
          this.addResult(code, "Error: " + error.message);
        }
        if (this.consoleInput && this.consoleInput.nativeElement) {
          this.consoleInput.nativeElement.value = "";
        }
        if (this.historyContainer && this.historyContainer.nativeElement) {
          this.historyContainer.nativeElement.scrollTop = this.historyContainer.nativeElement.scrollHeight;
        }
      }
    });


    /**
     * 
     */

  }




  private run() {

    const htmlCode = this.htmlEditor.getValue();
    const stylesheetCode = this.stylesheetEditor.getValue();
    const jsCode = this.jsEditor.getValue();

    this.overrideConsole();

    const output = this.outputFrame.nativeElement.contentWindow;
    try {
      output.eval(jsCode);
      this.addResult(jsCode, eval(jsCode));
    } catch (error: any) {
      this.addResult(jsCode, "Error: " + error.message);
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
        // this.consoleMessages.push(message);
        // alt with historyContainer

        // this.storeCode.push(args.join(' '));

        // this.addResult(args.join(' '), args.join(' '));


      }
    };

    console.error = (...args: any[]) => {
      const message = ('Error: ' + args.join(' ')).trim();
      if (message) {
        this.addResult(args.join(' '), message);
      }
    };
  }

  private scrollToBottom() {
    // this.cdRef.detectChanges();
    // if (this.consoleBox && this.consoleBox.nativeElement) {
    //   const messagesBox = this.consoleBox.nativeElement.querySelector('.messages-box');
    //   if (messagesBox) {
    //     messagesBox.scrollTop = messagesBox.scrollHeight;
    //   }
    // }

    // alt with historyContainer
    // if (this.historyContainer && this.historyContainer.nativeElement) {
      // this.historyContainer.nativeElement.scrollTop = this.historyContainer.nativeElement.scrollHeight;
    // }
  }


  toggleConsole() {
    this.showConsole = !this.showConsole;
    if (this.showConsole) {
      this.scrollToBottom();
    }
  }

  clearConsole() {
    // this.consoleMessages = [];
    // remove all child nodes
    if (this.historyContainer && this.historyContainer.nativeElement) {
      this.historyContainer.nativeElement.innerHTML = "";
    }
  }

  private applyStylesAndScript(htmlCode: string, finalCssCode: string, jsCode: string) {
    const output = this.outputFrame.nativeElement;
    const outputWindow = output.contentWindow;

    outputWindow.console.log = (...args: any[]) => {
      // this.consoleMessages.push(args.join(' '));

      // alt with historyContainer
      // this.addResult(args.join(' '), args.join(' '));
      window.console.log.apply(console, args);
    };

    outputWindow.console.error = (...args: any[]) => {
      // this.consoleMessages.push('Error: ' + args.join(' '));
      // alt with historyContainer
      // this.addResult(args.join(' '), 'Error: ' + args.join(' '));
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
