import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-your-work',
  templateUrl: './your-work.component.html',
  styleUrls: ['./your-work.component.scss']
})
export class YourWorkComponent implements OnInit  {
  data: any;

  constructor(
    private route: ActivatedRoute,
    private userData: UserDataService,
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = this.userData.getUserData()?.user_id; 
      if (userId) {
        const apiUrl = `http://localhost:3000/pen/getPenByUser/${userId}`;
        
        axios.get(apiUrl)
          .then((response) => {
            this.data = response.data;
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
