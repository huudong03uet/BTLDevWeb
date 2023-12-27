import { Component, ViewChild, OnInit } from '@angular/core';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { User } from 'src/app/models/user';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import {Pen} from "src/app/models/pen";

@Component({
  selector: 'app-home-code',
  templateUrl: './home-code.component.html',
  styleUrls: ['./home-code.component.scss']
})

export class HomeCodeComponent implements OnInit{
  @ViewChild(CodeEditorComponent) codeEditorComponent!: CodeEditorComponent;
  myPen!: any;
  isLoggedIn: boolean = false; // Khởi tạo giá trị mặc định
  webCodeData: { html: string; js: string; css: string; pen_id: string; user_id: Number } = {
    html: '',
    js: '',
    css: '',
    pen_id: '',
    user_id: 0,
  };


  constructor(
    private userData: UserDataService,
    private router: Router, 
    private route: ActivatedRoute,  
  ) {}
   ngOnInit(): void {
        // Lấy thông tin về trang trước đó
      this.route.params.subscribe(async (params) => {
        const penId = params['id'];
        // console.log(penId, 12345)
      if (penId != null) { 
        try {
          let data = await axios.post('http://localhost:3000/pen/getPenById', {pen_id: penId}); 
          this.myPen = data.data.pen;
          this.codeEditorComponent.setPen(this.myPen);
        } catch (error) {
          console.error('Error save pen:', error);
        }
      }
      else {
        this.myPen = null
      }
    });
    this.isLoggedIn = !!this.userData.getUserData();
  }

  async saveData() {
    if(this.userData.getUserData() == null) {
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
        name: this.myPen.name
      });
      this.myPen = response.data.pen;
    } catch (error) {
      console.error('Error save pen:', error);
    }
  }

  onWebCodeChanged(data: { html: string; js: string; css: string }) {
    // console.log('home', data);
    this.webCodeData = {
      html: data.html,
      js: data.js,
      css: data.css,
      pen_id: this.myPen?.pen_id || null,
      user_id: this.userData.getUserData()?.user_id || 0,
    };
  }

}
