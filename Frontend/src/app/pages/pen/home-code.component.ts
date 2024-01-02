import { Component, ViewChild, OnInit, HostListener, OnChanges } from '@angular/core';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { RouterTestingHarness } from '@angular/router/testing';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-home-code',
  templateUrl: './home-code.component.html',
  styleUrls: ['./home-code.component.scss']
})

export class HomeCodeComponent implements OnInit {
  @ViewChild(CodeEditorComponent) codeEditorComponent!: CodeEditorComponent;
  isLoggedIn = false;
  data: any;
  penId: any;

  constructor(
    private userData: UserDataService,
    private router: Router,
    private route: ActivatedRoute,
    private myService: HostService,
  ) {}

  ngOnInit(): void {
    // Lấy thông tin về trang trước đó
    this.route.params.subscribe(async (params) => {
      this.penId = params['id'];
      if (this.penId != null) {
        try {
          // console.log(this.penId, this.userData.getUserData());
          let data = await axios.get(this.myService.getApiHost() + `/pen/getInfoPen?pen_id=${this.penId}&user_id=${this.userData.getUserData()?.user_id}`); 
          // console.log(data)
          this.data = data.data;
          if(this.data.pen.status === "private") {
            this.router.navigate(['/**']);
          }
          this.loadPinAndFollow(this.penId);
        } catch (error) {
          this.router.navigate(['/**']);
          console.error('Error get pen:', error);
        }
      }
      else {
        this.data = { pen: {html_code: '', css_cod: '', js_code: '', type_css: "css"}, user: {user_id: '', user_name: ''}}
      }
    });
    this.isLoggedIn = !!this.userData.getUserData();
  }

  loadPinAndFollow(penId: any) {
    const url = this.myService.getApiHost() + `/grid/getInfoGrid?pen_id=${penId}&user_id=${this.userData.getUserData()?.user_id}`;
    axios.get(url)
      .then((response) => {
        this.data.followed = response.data.followed;
        this.data.pined = response.data.pined;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  async saveData() {
    if (this.userData.getUserData() == null) {
      this.router.navigate(['/login']);
      return;
    }
    try {
      // console.log(this.data);
      const response = await axios.post(this.myService.getApiHost() + '/pen/savePen', {
        data: this.data,
        user: this.userData.getUserData(),
      });
      if (response.status === 200) {
        // Nếu status là 200, thông báo lưu thành công
        this.data.pen = response.data.pen;
        alert('Lưu thành công');
      } else if (response.status === 201) {
        // Nếu status là 201, chuyển hướng đến trang mới với id là id của data.data.pen
        const newPenId = response.data.pen.pen_id; // Điều chỉnh tên trường id nếu cần
        this.router.navigate([ `/pen/${newPenId}`]); // Điều chỉnh đường dẫn mới nếu cần
        alert('Copy thành công');
      } else {
        console.error('Unexpected status:', response.status);
      }
  
    } catch (error) {
      console.error('Error saving pen:', error);
    }
  }

  @HostListener('document:keydown.control.s', ['$event'])  
  onKeydownHandler(event:KeyboardEvent) {
      event.preventDefault();
      this.saveData();
  }


  // onWebCodeChanged(data: { html: string; js: string; css: string }) {
  //   this.webCodeData = {
  //     html: data.html,
  //     js: data.js,
  //     css: data.css,
  //     pen_id: this.myPen?.pen_id || null,
  //     user_id: this.userData.getUserData()?.user_id || 0,
  //     name: this.myPen?.name || 'Untitled',  // Sử dụng name của pen hoặc 'Untitled'
  //   };
  // }

  onDataChange(newData: any) {
    this.data = newData;
  }

  onSaveData() {
    this.saveData();
  }
}
