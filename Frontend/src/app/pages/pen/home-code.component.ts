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


  constructor(
    private userData: UserDataService,
    private router: Router, 
    private route: ActivatedRoute,  
    
  ) {}
   ngOnInit(): void {
        // Lấy thông tin về trang trước đó
      this.route.params.subscribe(async (params) => {
        const penId = params['id'];
        console.log(penId, 12345)
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

  
  public getDataHome() {
    console.log('2222')
    return this.codeEditorComponent.getData();
  }

  async saveData() {
    console.log(this.getDataHome());
    const penData = this.getDataHome();
    let pen_id = null;
    if(this.myPen != null) {
      pen_id = this.myPen.pen_id;
    }
    if(this.userData.getUserData() == null) {
      this.router.navigate(['/login']);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/pen/createOrUpdatePen', {user_id: this.userData.getUserData()?.user_id, pen_id, html_code: penData.htmlCode, css_code: penData.stylesheetCode, js_code: penData.jsCode, name: this.myPen.name});
      this.myPen = response.data.pen;
    } catch (error) {
      console.error('Error save pen:', error);
    }
  }

}
