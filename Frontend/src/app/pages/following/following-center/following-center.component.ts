import { Component, Input, OnInit, } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-following-center',
  templateUrl: './following-center.component.html',
  styleUrls: ['./following-center.component.scss']
})
export class FollowingCenterComponent  implements OnInit {
  data: any;

  constructor(
    private route: ActivatedRoute,
    private userData: UserDataService,
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = this.userData.getUserData()?.user_id; 
      if (userId) {
        const apiUrl = `http://localhost:3000/pen/getFollow/${userId}`;
        
        axios.get(apiUrl)
          .then((response) => {
            this.data = response.data;
            console.log('abcxyz', this.data)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        console.error('User ID not available.');
      }
    });
  }
}
