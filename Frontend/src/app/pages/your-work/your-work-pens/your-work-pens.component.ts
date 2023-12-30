import { Component } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-your-work-pens',
  templateUrl: './your-work-pens.component.html',
  styleUrls: ['./your-work-pens.component.scss']
})
export class YourWorkPensComponent {
  pen_ids = []

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
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = this.userData.getUserData()?.user_id;
      if (userId) {
        const apiUrl = `http://localhost:3000/pen/getPenByUser/${userId}`;

        axios.get(apiUrl)
          .then((response) => {
            this.pen_ids = response.data;
            // this.pen_ids_current = this.pen_ids.slice(0, 6);
            // this.check_is_start_end();
            console.log('pen:', this.pen_ids)
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


  // clickNextPageButton() {
  //   this.page_now += 1;
  //   this.pen_ids_current = this.pen_ids.slice((this.page_now - 1) * 6, this.page_now * 6);
  //   this.check_is_start_end();
  // }

  // clickPrevPageButton() {
  //   this.page_now -= 1;
  //   this.pen_ids_current = this.pen_ids.slice((this.page_now - 1) * 6, this.page_now * 6);
  //   this.check_is_start_end();
  // }
}
