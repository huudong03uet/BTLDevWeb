import { ChangeDetectorRef, Component, ElementRef, Input, SimpleChange, ViewChild } from '@angular/core';
declare let CodeMirror: any;
@Component({
  selector: 'app-screen-code',
  templateUrl: './screen-code.component.html',
  styleUrls: ['./screen-code.component.scss']
})
export class ScreenCodeComponent {
   hasFileSelected: boolean = true;
   listFilesOpen = [
    {
      id: 1,
      title: "test_file1.css",
      type: "css",
      code: "body { background-color: red; }",
      children: []
    },
    {
      id: 2,
      title: "test_file.html",
      type: "html",
      code: "<h1>Hello World</h1>",
      children: []
    },
    {
      id: 3,
      title: "test_file.js",
      type: "js",
      code: "console.log('Hello World');",
      children: []
    }
   ]

   file_selected: any = this.listFilesOpen[0];

   changeActiveFile(file: any) {

    this.file_selected = file;
    console.log(this.file_selected);
   }


    

}
