import { ChangeDetectorRef, Component, ElementRef, Input, SimpleChange, ViewChild } from '@angular/core';
import { ProjectFileService } from 'src/app/services/project-file.service';
declare let CodeMirror: any;

interface FileProject {
  id: number;
  title: string;
  type: string;
  code: string;
  children: File[];
}

@Component({
  selector: 'app-screen-code',
  templateUrl: './screen-code.component.html',
  styleUrls: ['./screen-code.component.scss']
})
export class ScreenCodeComponent {
  hasFileSelected: boolean = true;
  fileNewOpen: any;
  //  listFilesOpen = [
  //   // {
  //   //   id: 1,
  //   //   title: "test_file1.css",
  //   //   type: "css",
  //   //   code: "body { background-color: red; }",
  //   //   children: []
  //   // },
  //   // {
  //   //   id: 2,
  //   //   title: "test_file.html",
  //   //   type: "html",
  //   //   code: "<h1>Hello World</h1>",
  //   //   children: []
  //   // },
  //   // {
  //   //   id: 3,
  //   //   title: "test_file.js",
  //   //   type: "js",
  //   //   code: "console.log('Hello World');",
  //   //   children: []
  //   // }
  //  ]
  // declare  fileNewOpen
  listFilesOpen: FileProject[] = [];

  file_selected: any = this.listFilesOpen?.[0] || null;
  count: boolean = false;

  changeActiveFile(file: any) {

    this.file_selected = file;
    this.count = !this.count;
  }

  clickCloseButton(id: number) {
    this.listFilesOpen = this.listFilesOpen.filter((file) => file.id !== id);
    if (id === this.file_selected.id) {
      this.file_selected = this.listFilesOpen[0];
      this.count = !this.count;
    }
  }


  constructor(private projectFile: ProjectFileService) { }

  ngOnInit(): void {
    this.projectFile.currentMessage.subscribe(message => {
      if (message) {
        // FileProject
        // check not duplicate

        const id_push = this.listFilesOpen.findIndex((file) => file.id === message.id);
        if (id_push === -1) {

          const fileProject: FileProject = {
            id: message.id,
            title: message.title,
            type: message.type,
            code: message.code,
            children: []
          }
          this.file_selected = fileProject;
          this.listFilesOpen.push(fileProject);
          this.hasFileSelected = true;
          this.count = !this.count;
        }  else {
          this.file_selected = this.listFilesOpen[id_push];
          this.hasFileSelected = true;
          this.count = !this.count;
        }



      }
    })
  }
}