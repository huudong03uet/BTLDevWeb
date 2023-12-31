import { Component } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { HostService } from 'src/app/host.service';
@Component({
  selector: 'app-your-work-projects',
  templateUrl: './your-work-projects.component.html',
  styleUrls: ['./your-work-projects.component.scss']
})
export class YourWorkProjectsComponent {
  projects = []

  // page_now: number = 1;
  // pen_ids_current: any[] = [];
  // is_end: boolean = false;
  // is_start: boolean = true;


  // check_is_start_end() {
  //   if (this.page_now == 1) {
  //     this.is_start = true;
  //   } else {
  //     this.is_start = false;
  //   }

  //   if (this.page_now * 6 >= this.pen_ids.length) {
  //     this.is_end = true;
  //   } else {
  //     this.is_end = false;
  //   }
  // }
  
  constructor(
    private route: ActivatedRoute,
    private userData: UserDataService,
    private router: Router,
    private myService: HostService,
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = this.userData.getUserData()?.user_id;
      if (userId) {
        const apiUrl = this.myService.getApiHost() + `/project/getProjectByUserID?user_id=${userId}`;

        axios.get(apiUrl)
          .then((response) => {
            this.projects = response.data;
            // this.pen_ids_current = this.pen_ids.slice(0, 6);
            // this.check_is_start_end();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        console.error('User ID not available.');
      }
    });
    // this.check_is_start_end();
  }


 
}
