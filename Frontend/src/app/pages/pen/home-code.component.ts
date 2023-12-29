import { Component, ViewChild, OnInit } from '@angular/core';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-home-code',
  templateUrl: './home-code.component.html',
  styleUrls: ['./home-code.component.scss']
})

export class HomeCodeComponent implements OnInit {
  @ViewChild(CodeEditorComponent) codeEditorComponent!: CodeEditorComponent;
  myPen: any;
  isLoggedIn = false;
  webCodeData = {
    html: '',
    js: '',
    css: '',
    pen_id: '',
    user_id: 0,
    name: '',
  };
  owner: any;


  constructor(
    private userData: UserDataService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Lấy thông tin về trang trước đó
    this.route.params.subscribe(async (params) => {
      const penId = params['id'];
      if (penId != null) {
        try {
          let data = await axios.post('http://localhost:3000/pen/getPenById', {pen_id: penId}); 

          if(data.data.pen.status === "private") {
            this.router.navigate(['/**']);
          }
          this.myPen = data.data.pen;
          this.codeEditorComponent.setPen(this.myPen);
          let data_user = await axios.get(`http://localhost:3000/user/getInfoUser?user_id=${this.myPen.user_id}`);
          this.owner = data_user.data;
          console.log(this.owner);
          if(this.userData.getUserData() !== null) {
            await axios.post('http://localhost:3000/grid/updateView', {penId: penId, userId: this.userData.getUserData()?.user_id})
          }
        } catch (error) {
          this.router.navigate(['/**']);
          console.error('Error save pen:', error);
        }
      } else {
        this.myPen = null;
      }
    });
    this.isLoggedIn = !!this.userData.getUserData();
  }

  async saveData() {
    if (this.userData.getUserData() == null) {
      this.router.navigate(['/login']);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/pen/createOrUpdatePen', {
        user_id: this.userData.getUserData()?.user_id,
        pen_id: this.webCodeData.pen_id,
        html_code: this.webCodeData.html,
        css_code: this.webCodeData.css,
        js_code: this.webCodeData.js,
        name: this.myPen.name, // Chỉnh sửa đoạn này để lưu tên của pen
      });
      this.myPen = response.data.pen;
    } catch (error) {
      console.error('Error saving pen:', error);
    }
  }

  onWebCodeChanged(data: { html: string; js: string; css: string }) {
    this.webCodeData = {
      html: data.html,
      js: data.js,
      css: data.css,
      pen_id: this.myPen?.pen_id || null,
      user_id: this.userData.getUserData()?.user_id || 0,
      name: this.myPen?.name || 'Untitled',  // Sử dụng name của pen hoặc 'Untitled'
    };
  }
}
