import { Component, ElementRef, HostListener, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProjectFileService } from 'src/app/services/project-file.service';
@Component({
  selector: 'app-folder-tree',
  templateUrl: './folder-tree.component.html',
  styleUrls: ['./folder-tree.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FolderTreeComponent {
  @Input() project_id: number | undefined;

  project_name: string = "File Manager";

  click_search: boolean = false;

  file_selected: any;
  datas = [
    {
      id: 2,
      title: "test_folder",
      type: "folder",
      code: "",
      children: [
        {
          id: 3,
          title: "test_file.css",
          type: "css",
          code: "body { background-color: red; }",
          children: []
        },
        {
          id: 4,
          title: "test_file.html",
          type: "html",
          code: "<h1>Hello World</h1>",
          children: []
        },
        {
          id: 5,
          title: "test_file.js",
          type: "js",
          code: "console.log('Hello World');",
          children: []
        },
        {
          id: 10,
          title: "test_folder2",
          type: "folder",
          code: "",
          children: [
            {
              id: 11,
              title: "test_file2.css",
              type: "css",
              code: "body { background-color: red; }",
              children: []
            },
            {
              id: 12,
              title: "test_file2.html",
              type: "html",
              code: "<h1>Hello World</h1>",
              children: []
            },
            {
              id: 13,
              title: "test_file2.js",
              type: "js",
              code: "console.log('Hello World');",
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 6,
      title: "test_file",
      type: "folder",
      code: "console.log('Hello World');",
      children: []
    },
    {
      id: 7,
      title: "test_file.png",
      type: "png",
      code: "",
      children: []
    },
    {
      id: 8,
      title: "css_test.css",
      type: "css",
      code: "",
      children: []
    },
    {
      id: 9,
      title: "html_test.html",
      type: "html",
      code: "",
      children: []
    }
  ]
  // constructor(private sanitizer: DomSanitizer, private projectFile: ProjectFileService) { }
  constructor(private renderer: Renderer2, private el: ElementRef, private projectFile: ProjectFileService, private sanitizer: DomSanitizer) { }

  /**
   * sort data
   */
  sortData() {
    // folder, after file , if the same folder or file, sort by name
    this.datas.sort((a, b) => {
      if (a.type == b.type) {
        if (a.title < b.title) {
          return -1;
        } else {
          return 1;
        }
      } else {
        if (a.type == "folder") {
          return -1;
        } else {
          return 1;
        }
      }
    });
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].children.length > 0) {
        this.sortDataChild(this.datas[i].children);
      }
    }
  }

  sortDataChild(obj: any) {
    obj.sort((a: any, b: any) => {
      if (a.type == b.type) {
        if (a.title < b.title) {
          return -1;
        } else {
          return 1;
        }
      } else {
        if (a.type == "folder") {
          return -1;
        } else {
          return 1;
        }
      }
    });
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].children.length > 0) {
        this.sortDataChild(obj[i].children);
      }
    }
  }

  reRenderTree() {
    this.sortData();
    let tree = this.renderTree(this.datas);
    console.log("12345")
    let folderTreeFileElement = this.el.nativeElement.querySelector('#folder-tree-file');
    console.log("1234")

    if (folderTreeFileElement) {
      if (folderTreeFileElement.firstChild) {
        this.renderer.removeChild(folderTreeFileElement, folderTreeFileElement.firstChild);
      }
      console.log("123")
      this.renderer.appendChild(folderTreeFileElement, tree);
      this.renderer.appendChild(folderTreeFileElement, tree);

    } else {
      console.error('Element #folder-tree-file not found');
    }
    console.log("123")
  }


  ngOnInit(): void {
    this.reRenderTree();

  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  renderTree(obj: any) {
    let ul = this.renderer.createElement('ul');
    for (let i = 0; i < obj.length; i++) {
      let obj_id = obj[i];
      let li = this.renderer.createElement('li');
      this.renderer.addClass(li, obj[i].type);
      this.renderer.setProperty(li, 'id', obj[i].id);
      this.renderer.setProperty(li, 'innerHTML', this.renderSvg(obj[i].type) + `<span>${obj[i].title}</span>`);
      this.renderer.listen(li, 'click', (event) => {
        event.stopPropagation();
        this.fileOpen(obj_id.id);
      });
      if (obj[i].children.length > 0) {
        let childUl = this.renderTree(obj[i].children);
        this.renderer.appendChild(li, childUl);
      }
      this.renderer.appendChild(ul, li);
    }
    return ul;
  }





  renderSvg(obj: string) {
    if (obj == "folder") {
      return `<svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path fill="rgb(203, 203, 203)" d="M572.6 270.3l-96 192C471.2 473.2 460.1 480 447.1 480H64c-35.35 0-64-28.66-64-64V96c0-35.34 28.65-64 64-64h117.5c16.97 0 33.25 6.742 45.26 18.75L275.9 96H416c35.35 0 64 28.66 64 64v32h-48V160c0-8.824-7.178-16-16-16H256L192.8 84.69C189.8 81.66 185.8 80 181.5 80H64C55.18 80 48 87.18 48 96v288l71.16-142.3C124.6 230.8 135.7 224 147.8 224h396.2C567.7 224 583.2 249 572.6 270.3z"/></svg>`

    } else if (obj == "html" || obj == "htm") {
      return `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" rx="5" fill="#FF3C41"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M21.325 13.893a1.75 1.75 0 0 0-2.65-2.286l-11 12.75a1.75 1.75 0 0 0 0 2.286l11 12.75a1.75 1.75 0 0 0 2.65-2.286L11.311 25.5l10.014-11.607Zm7.35 0a1.75 1.75 0 0 1 2.65-2.286l11 12.75a1.75 1.75 0 0 1 0 2.286l-11 12.75a1.75 1.75 0 0 1-2.65-2.286L38.689 25.5 28.675 13.893Z" fill="#282828"></path></svg>`
    } else if (obj == "css" || obj == "scss" || obj == "sass") {
      return `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" rx="5" fill="#0EBEFF"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="m27.175 28.711 7.786 4.565a2.11 2.11 0 0 0 1.604.212 2.143 2.143 0 0 0 1.291-.988 2.203 2.203 0 0 0 .198-1.63 2.17 2.17 0 0 0-.983-1.306L29.285 25l7.787-4.564a2.17 2.17 0 0 0 .982-1.305 2.203 2.203 0 0 0-.198-1.631 2.143 2.143 0 0 0-1.291-.988 2.11 2.11 0 0 0-1.604.212l-7.786 4.565V12.16a2.19 2.19 0 0 0-.621-1.518 2.124 2.124 0 0 0-1.49-.642c-1.13 0-2.11.964-2.11 2.156v9.133l-7.786-4.565a2.11 2.11 0 0 0-1.604-.212c-.54.145-1.005.5-1.291.988a2.202 2.202 0 0 0-.198 1.63c.147.55.5 1.018.983 1.306L20.844 25l-7.786 4.564a2.168 2.168 0 0 0-.983 1.305 2.202 2.202 0 0 0 .198 1.631 2.122 2.122 0 0 0 2.895.776l7.786-4.565v9.129c0 1.161.946 2.16 2.11 2.16 1.132 0 2.11-.964 2.11-2.156v-9.133Z" fill="#282828"></path></svg>`
    } else if (obj == "js" || obj == "ts") {
      return `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" rx="5" fill="#FFDD40"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M22.263 11.845c0 .89-.633 1.654-1.506 1.81-4 .724-7.067 5.367-7.067 10.917s3.067 10.19 7.067 10.914a1.847 1.847 0 0 1-.684 3.623C14.297 38.035 10 31.859 10 24.572c0-7.29 4.297-13.466 10.073-14.54a1.846 1.846 0 0 1 2.19 1.813Zm6.307 0a1.85 1.85 0 0 1 2.19-1.813c5.777 1.073 10.073 7.25 10.073 14.54 0 7.287-4.296 13.467-10.073 14.537a1.846 1.846 0 0 1-.683-3.623c4-.724 7.066-5.367 7.066-10.914 0-5.55-3.066-10.193-7.066-10.916a1.836 1.836 0 0 1-1.507-1.81Z" fill="#282828"></path></svg>`
    } else if (obj == "png" || obj == "jpg" || obj == "jpeg" || obj == "gif") {
      return `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" rx="5" fill="#FFDD40"></rect><rect width="50" height="50" rx="5" fill="#FF3C41" fill-opacity="0.25"></rect><path d="M30.833 21.667a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" fill="#000"></path><path d="M10 13.333A3.333 3.333 0 0 1 13.333 10h23.334A3.333 3.333 0 0 1 40 13.333v23.334A3.333 3.333 0 0 1 36.667 40H13.333A3.333 3.333 0 0 1 10 36.667V13.333Zm26.667 0H13.333v13.2l5.626-4.501a1.667 1.667 0 0 1 2.082 0l7.169 5.735 2.278-2.279a1.668 1.668 0 0 1 2.357 0l3.822 3.822V13.333Z" fill="#000"></path></svg>`
    } else if (obj == "ttf" || obj == "otf" || obj == "woff" || obj == "woff2") {
      return `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" rx="5" fill="#0EBEFF"></rect><rect width="50" height="50" rx="5" fill="#AE63E4" fill-opacity="0.75"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M33.6 39a2.8 2.8 0 0 0 2.8-2.8V16.6L30.8 11h-14a2.8 2.8 0 0 0-2.8 2.8v22.4a2.8 2.8 0 0 0 2.8 2.8h16.8Zm-2.8-18.2a1.4 1.4 0 1 0 0-2.8H19.6a1.4 1.4 0 1 0 0 2.8h11.2Zm1.4 4.2a1.4 1.4 0 0 1-1.4 1.4H19.6a1.4 1.4 0 1 1 0-2.8h11.2a1.4 1.4 0 0 1 1.4 1.4Zm-1.4 7a1.4 1.4 0 1 0 0-2.8H19.6a1.4 1.4 0 1 0 0 2.8h11.2Z" fill="#000"></path></svg>`
    }
    return `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" rx="5" fill="#FFDD40"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M22.263 11.845c0 .89-.633 1.654-1.506 1.81-4 .724-7.067 5.367-7.067 10.917s3.067 10.19 7.067 10.914a1.847 1.847 0 0 1-.684 3.623C14.297 38.035 10 31.859 10 24.572c0-7.29 4.297-13.466 10.073-14.54a1.846 1.846 0 0 1 2.19 1.813Zm6.307 0a1.85 1.85 0 0 1 2.19-1.813c5.777 1.073 10.073 7.25 10.073 14.54 0 7.287-4.296 13.467-10.073 14.537a1.846 1.846 0 0 1-.683-3.623c4-.724 7.066-5.367 7.066-10.914 0-5.55-3.066-10.193-7.066-10.916a1.836 1.836 0 0 1-1.507-1.81Z" fill="#282828"></path></svg>`
  }


  changeStatusNav() {
    this.click_search = !this.click_search;
  }



  /**
   * Search
   */
  search: string = "";
  list_files_search: number[] = [];
  searchParentChild(obj: any, searchValue: string) {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].title.includes(searchValue)) {
        this.list_files_search.push(obj[i].id);
      }
      if (obj[i].children.length > 0) {
        this.searchParentChild(obj[i].id, searchValue);
      }

    }


  }
  link_files_search: string[] = [];
  searchFiles(searchValue: string) {
    if (searchValue == "") {
      this.link_files_search = [];
      this.list_files_search = [];
      return;
    }
    this.search = searchValue;
    this.list_files_search = [];
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].title.includes(searchValue)) {
        this.list_files_search.push(this.datas[i].id);
      }
      if (this.datas[i].children.length > 0) {
        this.searchParentChild(this.datas[i].children, searchValue);
      }
    }

    this.convertListToLink();
    // console.log(this.link_files_search)
  }

  /**
   * Convert
   */

  convertListToLink() {
    this.link_files_search = [];
    for (let i = 0; i < this.list_files_search.length; i++) {
      this.link_files_search.push(this.convertIdToLink(this.list_files_search[i]));
    }
  }

  convertIdToLink(id: number) {
    let link = "";
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].id == id) {
        link += this.datas[i].title;
        break;
      }
      if (this.datas[i].children.length > 0) {
        link += this.convertIdToLinkChild(this.datas[i].children, id);
        if (link != "") {
          link = this.datas[i].title + "/" + link;
          break;
        }
      }
    }
    return link;
  }

  convertIdToLinkChild(obj: any, id: number) {
    let link = "";
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].id == id) {
        link += obj[i].title;
        break;
      }
      if (obj[i].children.length > 0) {
        link += this.convertIdToLinkChild(obj[i].children, id);
        if (link != "") {
          link = obj[i].title + "/" + link;
          break;
        }
      }
    }
    return link;
  }

  hiddenAllChildren(folder: any) {
    let children = folder.querySelectorAll('li');
    for (let i = 0; i < children.length; i++) {
      if (children[i].classList.contains("close-file")) {
        this.renderer.removeClass(children[i], "close-file");
      } else {
        this.renderer.addClass(children[i], "close-file");
      }
    }
  }



  /**
   * 
   * file open
   */

  fileOpen(id_file: any) {

    // console.log("file_open", fileOpen)
    // find fileOpen in datas
    let fileOpen: any = null;
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].id == id_file) {
        fileOpen = this.datas[i];
        break;
      }
      if (this.datas[i].children.length > 0) {
        fileOpen = this.fileOpenChild(this.datas[i].children, id_file);
        if (fileOpen != null) {
          break;
        }
      }
    }


    if (fileOpen.type != "folder") {
      this.projectFile.changeMessage(fileOpen);

    }

    if (fileOpen.type == "folder") {
      let folder = document.getElementById(fileOpen.id);

      if (folder?.classList.contains("close-folder")) {
        this.renderer.removeClass(folder, "close-folder");
        this.hiddenAllChildren(folder);
        // change icon -> <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 32 32" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M1,5.998l-0,16.002c-0,1.326 0.527,2.598 1.464,3.536c0.938,0.937 2.21,1.464 3.536,1.464c5.322,0 14.678,-0 20,0c1.326,0 2.598,-0.527 3.536,-1.464c0.937,-0.938 1.464,-2.21 1.464,-3.536c0,-3.486 0,-8.514 0,-12c0,-1.326 -0.527,-2.598 -1.464,-3.536c-0.938,-0.937 -2.21,-1.464 -3.536,-1.464c-0,0 -10.586,0 -10.586,0c0,-0 -3.707,-3.707 -3.707,-3.707c-0.187,-0.188 -0.442,-0.293 -0.707,-0.293l-5.002,0c-2.76,0 -4.998,2.238 -4.998,4.998Z"/><g id="Icon"/></svg>
        folder?.querySelector('svg')?.setAttribute('viewBox', '0 0 576 512');
        folder?.querySelector('path')?.setAttribute('d', 'M572.6 270.3l-96 192C471.2 473.2 460.1 480 447.1 480H64c-35.35 0-64-28.66-64-64V96c0-35.34 28.65-64 64-64h117.5c16.97 0 33.25 6.742 45.26 18.75L275.9 96H416c35.35 0 64 28.66 64 64v32h-48V160c0-8.824-7.178-16-16-16H256L192.8 84.69C189.8 81.66 185.8 80 181.5 80H64C55.18 80 48 87.18 48 96v288l71.16-142.3C124.6 230.8 135.7 224 147.8 224h396.2C567.7 224 583.2 249 572.6 270.3z');




      } else {
        this.renderer.addClass(folder, "close-folder");
        this.hiddenAllChildren(folder);
        // change icon ->       <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M572.6 270.3l-96 192C471.2 473.2 460.1 480 447.1 480H64c-35.35 0-64-28.66-64-64V96c0-35.34 28.65-64 64-64h117.5c16.97 0 33.25 6.742 45.26 18.75L275.9 96H416c35.35 0 64 28.66 64 64v32h-48V160c0-8.824-7.178-16-16-16H256L192.8 84.69C189.8 81.66 185.8 80 181.5 80H64C55.18 80 48 87.18 48 96v288l71.16-142.3C124.6 230.8 135.7 224 147.8 224h396.2C567.7 224 583.2 249 572.6 270.3z"/></svg>
        folder?.querySelector('svg')?.setAttribute('viewBox', '0 0 32 32');
        folder?.querySelector('path')?.setAttribute('d', 'M1,5.998l-0,16.002c-0,1.326 0.527,2.598 1.464,3.536c0.938,0.937 2.21,1.464 3.536,1.464c5.322,0 14.678,-0 20,0c1.326,0 2.598,-0.527 3.536,-1.464c0.937,-0.938 1.464,-2.21 1.464,-3.536c0,-3.486 0,-8.514 0,-12c0,-1.326 -0.527,-2.598 -1.464,-3.536c-0.938,-0.937 -2.21,-1.464 -3.536,-1.464c-0,0 -10.586,0 -10.586,0c0,-0 -3.707,-3.707 -3.707,-3.707c-0.187,-0.188 -0.442,-0.293 -0.707,-0.293l-5.002,0c-2.76,0 -4.998,2.238 -4.998,4.998Z');

      }

    }
    this.file_selected = fileOpen;
    // add class active to li tag has id = fileOpen.id, and remove class active to other li
    let li = document.querySelectorAll('li');
    for (let i = 0; i < li.length; i++) {
      if (li[i].classList.contains("active")) {
        this.renderer.removeClass(li[i], "active");
      }
      if (li[i].id == fileOpen.id) {
        this.renderer.addClass(li[i], "active");
      }
    }

  }

  fileOpenChild(children: { id: number; title: string; type: string; code: string; children: { id: number; title: string; type: string; code: string; children: never[]; }[]; }[], id_file: any): any {
    let fileOpen: any = null;
    for (let i = 0; i < children.length; i++) {
      if (children[i].id == id_file) {
        fileOpen = children[i];
        break;
      }
      if (children[i].children.length > 0) {
        fileOpen = this.fileOpenChild(children[i].children, id_file);
        if (fileOpen != null) {
          break;
        }
      }
    }
    return fileOpen;
  }

  onProjectClick(event: Event) {
    this.file_selected = undefined;
    let li = document.querySelectorAll('li');
    for (let i = 0; i < li.length; i++) {
      if (li[i].classList.contains("active")) {
        this.renderer.removeClass(li[i], "active");
      }
    }



  }


  /**
   * 
   *  remove file
   */
  //  when enter keydown delete and select file != undefined

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Delete' && this.file_selected !== undefined) {
      this.removeFileCurrent();
    }
  }

  removeFileCurrent() {
    console.log("file_datas", this.datas)
    if (this.file_selected == undefined) {
      return;
    }

    this.datas = this.removeFileOrFolder(this.datas, this.file_selected.id);
    if (this.file_selected.type != "folder") {
      //  remove in tree


      let li = document.getElementById(this.file_selected.id);
      let parent = li?.parentElement;
      this.renderer.removeChild(parent, li);
      this.file_selected.is_remove = true;
      this.projectFile.changeMessage(this.file_selected);
    } else {
      this.removeChildren(this.file_selected.children);
      let li = document.getElementById(this.file_selected.id);
      let parent = li?.parentElement;
      this.renderer.removeChild(parent, li);


    }



    this.file_selected = undefined;
    console.log("datas", this.datas)


  }
  removeChildren(children: any) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].children.length > 0) {
        this.removeChildren(children[i].children);
      }
      let li = document.getElementById(children[i].id);
      let parent = li?.parentElement;
      this.renderer.removeChild(parent, li);
    }
  }

  removeFileOrFolder(obj: any, id: number) {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].id == id) {
        obj.splice(i, 1);
        break;
      }
      if (obj[i].children.length > 0) {
        this.removeFileOrFolder(obj[i].children, id);
      }
    }
    return obj;
  }


  /**
   * Add file
   * 
   */
  addFile() {
    if (this.file_selected == undefined || this.file_selected.type != "folder") {
      return;
    }

    let fileNewOpen: any = {
      //id random 10000000
      id: Math.floor(Math.random() * 10000000),
      title: "new_file.html",
      type: "html",
      code: "",
      children: []
    }
    console.log("fileNewOpen", fileNewOpen)
    this.datas = this.addFileOrFolder(this.datas, this.file_selected.id, fileNewOpen);
    console.log("datas 1", this.datas)
    this.reRenderTree();
    console.log("datas 2", this.datas)
    this.fileOpen(fileNewOpen.id);
    console.log("datas 3", this.datas)

    this.file_selected = fileNewOpen;
  }
  addFolder() {
    if (this.file_selected == undefined || this.file_selected.type != "folder") {
      return;

    }

    let folderNewOpen: any = {
      id: Math.floor(Math.random() * 10000000),
      title: "new_folder",
      type: "folder",
      code: "",
      children: []
    }

    this.datas = this.addFileOrFolder(this.datas, this.file_selected.id, folderNewOpen);
    this.reRenderTree();
    this.fileOpen(folderNewOpen.id);

    this.file_selected = folderNewOpen;



  }
  addFileOrFolder(obj: any, id: number, fileOrFolder: any) {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].id == id) {
        obj[i].children.push(fileOrFolder);
        break;
      }
      if (obj[i].children.length > 0) {
        this.addFileOrFolder(obj[i].children, id, fileOrFolder);
      }
    }
    return obj;
  }
}