import { Component, ViewChild, OnInit, HostListener, OnChanges } from '@angular/core';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { RouterTestingHarness } from '@angular/router/testing';
import { HostService } from 'src/app/host.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {
//  set time
// set class for toast

   }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.penId = params['id'];
      if (this.penId != null) {
        try {
          let data = await axios.get(this.myService.getApiHost() + `/pen/getInfoPen?pen_id=${this.penId}&user_id=${this.userData.getUserData()?.user_id}`);
          this.data = data.data;
          if (this.data.pen.status === "private" && this.data.pen.user_id != this.userData.getUserData()?.user_id) {
            this.router.navigate(['/**']);
          }
          this.loadPinAndFollow(this.penId);
        } catch (error) {
          this.router.navigate(['/**']);
          console.error('Error get pen:', error);
        }
      }
      else {
        this.data = { pen: { html_code: '', css_cod: '', js_code: '', type_css: "css" }, user: { user_id: '', user_name: '' } }
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
      const response = await axios.post(this.myService.getApiHost() + '/pen/savePen', {
        data: this.data,
        user: this.userData.getUserData(),
      });
      if (response.status === 200) {
        this.data.pen = response.data.pen;
        // alert('Saved successfully!');
        this.toastr.success('Save successfully!', '');
      } else if (response.status === 201) {
        const newPenId = response.data.pen.pen_id;
        this.router.navigate([`/pen/${newPenId}`]);
        this.toastr.success('Save successfully!', '');
      }  else if (response.status === 202) {
        const newPenId = response.data.pen.pen_id;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.toastr.success('Save successfully!', '');


        this.router.navigate([`/pen/${newPenId}`]);


      } else {
        console.error('Unexpected status:', response.status);

      }

    } catch (error) {
      console.error('Error saving pen:', error);
    }
  }

  @HostListener('document:keydown.control.s', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
    this.saveData();
  }



  onDataChange(newData: any) {
    this.data = newData;
  }

  onSaveData() {
    this.saveData();
  }
}
