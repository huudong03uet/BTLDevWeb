import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, SimpleChange, ViewChild } from '@angular/core';
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
  @Input() data: any;
  @Output() dataChange = new EventEmitter();
  

  hasFileSelected: boolean = true;
  fileNewOpen: any;
  listFilesOpen: FileProject[] = [];

  file_selected: any = this.listFilesOpen?.[0] || null;

  changeActiveFile(file: any) {

    this.data.fileChoose = file;
    this.data.sidebarChoose = file;
    this.dataChange.emit(this.data);
  }

  clickCloseButton(id: number) {
    this.data.filesOpened.delete(id);
    if(id == this.data.fileChoose && this.data.filesOpened.size > 0) {
      // Chuyển đổi Set thành mảng
      let filesArray: number[] = Array.from(this.data.filesOpened);

      // Lấy phần tử đầu tiên của mảng
      let firstElement: number | undefined = filesArray[0];
      this.data.fileChoose = firstElement;
      this.data.sidebarChoose = firstElement;
    }
    this.dataChange.emit(this.data);
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
        }  else {
          this.file_selected = this.listFilesOpen[id_push];
          this.hasFileSelected = true;
        }



      }
    })
  }

  onDataChange(data: any) {
    this.data = data;
    this.dataChange.emit(this.data);
  }

}