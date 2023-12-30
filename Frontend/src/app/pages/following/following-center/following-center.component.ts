import { ChangeDetectorRef, Component, Input, NgZone, OnInit, } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-following-center',
  templateUrl: './following-center.component.html',
  styleUrls: ['./following-center.component.scss']
})
export class FollowingCenterComponent {
  data = [2, 3, 3]
  pen_ids = [
    1, 2, 3, 3,
    3, 2, 1, 3,
    3, 2, 1, 3,
    3, 2, 1,
  ]
  constructor(
    private route: ActivatedRoute,
    private userData: UserDataService,
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = this.userData.getUserData()?.user_id;
      if (userId) {
        let apiUrl = `http://localhost:3000/pen/getFollow/${userId}`;
        axios.get(apiUrl).then((response) => {
          this.pen_ids = response.data;
          // console.log('pen follow', this.pen_ids)
        }).catch((error) => {
          console.error('Error:', error);
        });


        apiUrl = `http://localhost:3000/user/getNotFollow/${userId}`;

        axios.get(apiUrl).then((response) => {
          this.data = response.data;

          // console.log('em khong biet:', this.data);

          // get 3 first element    
          // this.data = this.data.slice(0, 3);

          // console.log('user not follow', this.data)
        }).catch((error) => {
          console.error('Error:', error);
        });
      } else {
        console.error('User ID not available.');
      }


    });
  }
}

