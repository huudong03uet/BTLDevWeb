import { Component, ViewChild, ElementRef, AfterViewInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
declare let CodeMirror: any;


@Component({
  selector: 'app-code-box-project',
  templateUrl: './code-box-project.component.html',
  styleUrls: ['./code-box-project.component.scss']
})
export class CodeBoxProjectComponent implements AfterViewInit {
  @ViewChild('codeTextarea', { static: false }) codeTextarea: ElementRef | undefined;

  @Input() data: any;
  @Output() dataChange = new EventEmitter();
  currentCode: String = '';
  lastFileChoose: any = null;

  codeEditor: any;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data.fileChoose != this.lastFileChoose) {
      if (this.codeTextarea && this.codeTextarea.nativeElement && this.data?.fileChoose) {
        this.lastFileChoose = this.data.fileChoose;

        this.currentCode = this.data?.data_map[this.data?.fileChoose]?.content;
        const fileName = this.data?.fileChoose;
        const fileExtension = fileName ? fileName.split('.').pop() : '';
        const mode = this.getModeFromExtension(fileExtension);
        this.codeEditor.setOption('mode', mode);
        this.codeEditor.setValue(this.currentCode);
      }
    }
  }

  

  ngAfterViewInit() {
    // Kiểm tra xem codeTextarea đã được khởi tạo và có giá trị hay không
    if (this.codeTextarea && this.codeTextarea.nativeElement) {
      this.initializeCodeMirrorEditor();
      if(this.data.fileChoose) {
        this.currentCode = this.data?.data_map[this.data?.fileChoose]?.content;
        this.codeEditor.setValue(this.currentCode);  
      }

    }
  }

  initializeCodeMirrorEditor() {
    let mode = 'html';
    if(this.data?.filesOpened?.size > 0) {
      const fileName = this.data?.fileChoose;
      const fileExtension = fileName ? fileName.split('.').pop() : '';
      console.log(fileName);
      mode = this.getModeFromExtension(fileExtension);
    }

    this.codeEditor = CodeMirror.fromTextArea(this.codeTextarea?.nativeElement, {
      mode: mode,
      lineNumbers: true,
      lineWrapping: true,
      theme: 'monokai',
      autoCloseBrackets: true,
      autoCloseTags: true,
      // Add any other configuration options you need
    });

    this.codeEditor.on('change', () => this.onCodeChange());
  }

  getModeFromExtension(fileExtension: string): string {
    // Map file extensions to CodeMirror modes
    switch (fileExtension) {
      case 'html':
        return 'xml';
      case 'css':
        return 'css';
      case 'js':
        return 'javascript';
      // Add more cases as needed
      default:
        return 'text/plain';
    }
  }

  onCodeChange() {
    console.log(123333);
    if(this.data.fileChoose) {
      const newCode = this.codeEditor.getValue();
      this.data.data_map[this.data.fileChoose].content = newCode;
      this.dataChange.emit(this.data);
      console.log(this.codeEditor.getOption('mode'));  
    }
  }
}
