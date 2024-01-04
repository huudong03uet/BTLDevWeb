import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  data_source: any;
  data_key: any;
  data_map: any = {};
  list_file_open = [];
  selected: any = null;
  success = false;
  constructor() { 
  }

  async getData(project_id: any): Promise<void> {
    try {
      this.data_source = (await axios.get(`http://localhost:3000/project/getInfoProject?project_id=${project_id}`)).data;
      this.sortData();
      console.log(this.data_source)

      let root = {
        name: 'root',
        subfolders: {},
        files: [],
        status: 'open'
      };
      
      this.data_source.folder.forEach((folder: any) => {
        let path = folder.name.split('/');
        let path2 = folder.name.split('/');
        let folderName = path.pop();

        let folderNode = {
          name: folderName,
          key: folder.name,
          type: 'folder',
          status: 'close'

        }
        this.buildFolderTree(path2, folderNode, root.subfolders);
      });
      
      this.data_source.file.forEach((file: any) => {
        let path = file.name.split('/');
        let path2 = file.name.split('/');
        let fileName = path.pop();
        let fileNode = {
          name: fileName,
          key: file.name,
          type: 'file',
        };
        this.addFileToTree(path2, fileNode, root.subfolders);
   
      });
      this.data_key = root;
      console.log(this.data_key)
      // Add folders to the map
      this.data_source.folder.forEach((folder: any) => {
        folder.type = 'folder';
        this.data_map[folder.name] = folder;
      });

      // Add files to the map
      this.data_source.file.forEach((file: any) => {
        file.type = 'file';
        this.data_map[file.name] = file;
      });

      this.success = true;



    
    
    
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  buildFolderTree(path: any, node: any, tree: any) {
    if (path.length === 0) return;
  
   let part = path.shift();
  
   if (!tree[part]) {
     tree[part] = {
       ...node,
       name: part,
       subfolders: {},
       files: []
     };
   }
  
   this.buildFolderTree(path, node, tree[part].subfolders);
  }
  
  addFileToTree(path: any, file: any, tree: any) {
   let part = path.shift();
  
   if (path.length === 1) {
     tree[part].files.push(file);
   } else {
     if (tree[part]) {
       this.addFileToTree(path, file, tree[part].subfolders);
     }
   }
  }

  sortData() {
        // Sort folders
    this.data_source.folder.sort((a: any, b: any) => a.name.localeCompare(b.name));

    // Sort files
    this.data_source.file.sort((a: any, b: any) => a.name.localeCompare(b.name));    
  }
  
  getDataFull() {
    return {data_map: this.data_map, data_key: this.data_key, data_source: this.data_source};
  }
  
}
