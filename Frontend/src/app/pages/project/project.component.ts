import { Component, ElementRef, ViewChild, AfterViewInit, OnChanges, OnInit, AfterViewChecked } from '@angular/core';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { set } from 'lodash';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, AfterViewInit {
  @ViewChild('box1') box1!: ElementRef;
  @ViewChild('box2') box2!: ElementRef;
  @ViewChild('box3') box3!: ElementRef;
  data: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private myService: HostService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      let project_id = params['id'];
      if (project_id !== null) {
        try {
          let data_source = (await axios.get(this.myService.getApiHost() + `/project/getInfoProject?project_id=${project_id}`)).data;
          this.sortData(data_source);

          let root = {
            name: 'root',
            subfolders: {},
            files: [],
            input: false,
            status: 'open'
          };

          data_source.folder.forEach((folder: any) => {
            let path = folder.name.split('/');
            let path2 = folder.name.split('/');
            let folderName = path.pop();

            let folderNode = {
              name: folderName,
              key: folder.name,
              type: 'folder',
              input: 'false',
              status: 'close'

            }
            this.buildFolderTree(path2, folderNode, root.subfolders);
          });

          data_source.file.forEach((file: any) => {
            let path = file.name.split('/');
            let path2 = file.name.split('/');
            let fileName = path.pop();
            let fileNode = {
              name: fileName,
              key: file.name,
              input: false,
              type: 'file',
            };
            this.addFileToTree(path2, fileNode, root);


          });
          let data_key = root;
          console.log(data_key)
          let data_map: any = {};
          // Add folders to the map
          data_source.folder.forEach((folder: any) => {
            folder.type = 'folder';
            data_map[folder.name] = folder;
          });

          // Add files to the map
          data_source.file.forEach((file: any) => {
            file.type = 'file';
            data_map[file.name] = file;
          });

          let filesOpened: Set<any> = new Set();
          let fileChoose: any = null;
          let sidebarChoose: any = null;

          let key_file_html: Set<any> = this.getFileNames(data_map);
          this.data = { data_key, data_map, data_source, filesOpened, fileChoose, sidebarChoose, key_file_html };
          console.log(this.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }

      }
    });


  }



  ngAfterViewInit() {
    const boxes = {
      box1: this.box1?.nativeElement,
      box2: this.box2?.nativeElement,
      box3: this.box3?.nativeElement
    };
    const resizers = document.getElementsByClassName('resizer');
    for (let i = 0; i < resizers.length; i++) {
      const resizer = resizers[i];
      resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);

        function resize(e: MouseEvent) {
          if (resizer.classList.contains('vertical')) {
            resizeX(e);
          } else {
            resizeY(e);
          }
          e.preventDefault();
        }

        function stopResize() {
          document.removeEventListener('mousemove', resize);
        }

        function resizeX(e: MouseEvent) {
          const bodyWidth = 100 / document.body.clientWidth;
          const leftWidth = (parseFloat(getComputedStyle(boxes.box1, '').width) + e.movementX) * bodyWidth;



          boxes.box1.style.width = leftWidth + '%';
          boxes.box2.style.width = (100 - leftWidth) + '%';
          boxes.box3.style.width = (100 - leftWidth) + '%';
        }

        function resizeY(e: MouseEvent) {
          const bodyHeight = 100 / document.body.clientHeight;
          const topHeight = (parseFloat(getComputedStyle(boxes.box2, '').height) + e.movementY) * bodyHeight;
          boxes.box2.style.height = topHeight + '%';
          boxes.box3.style.height = (100 - topHeight) + '%';
        }
      });
    }
  }

  onDataChange(data: any) {
    this.data = { ...data }; // Gán một đối tượng mới
    // this.data = data;
  }

  getFileNames(dataMap: any): Set<string> {
    let fileNames: Set<string> = new Set();

    for (const key in dataMap) {
      const value = dataMap[key];

      // Kiểm tra cả key và status
      if (value.type === 'file' && value.name.endsWith('.html')) {
        fileNames.add(key);
      }
    }

    return fileNames;
  }

  async getData(project_id: any) {
  }

  buildFolderTree(path: any, node: any, tree: any) {
    if (path.length === 0) return;

    let part = path.shift();

    if (!tree[part]) {
      tree[part] = {
        ...node,
        name: part,
        input: false,
        subfolders: {},
        files: []
      };
    }

    this.buildFolderTree(path, node, tree[part].subfolders);
  }

  addFileToTree(path: any, file: any, tree: any) {
    let part = path.shift();
    console.log(path)
    if (path.length === 0) {
      console.log(tree.files.push(file))
    }
    else {

      this.addFileToTree(path, file, tree.subfolders[part]);
    }
  }

  sortData(data: any) {
    // Sort folders
    data.folder.sort((a: any, b: any) => a.name.localeCompare(b.name));

    // Sort files
    data.file.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }


  // dayLaTinhNang() {
  //     console.log("day la tinh nang")
  // }

}