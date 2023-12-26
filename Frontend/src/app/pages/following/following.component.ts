import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss', '../settings/style-settings.scss']
})
export class FollowingComponent implements OnInit {
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
