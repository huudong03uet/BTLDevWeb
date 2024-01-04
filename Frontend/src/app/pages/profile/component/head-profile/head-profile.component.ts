import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-head-profile',
  templateUrl: './head-profile.component.html',
  styleUrls: ['./head-profile.component.scss']
})
export class HeadProfileComponent implements OnInit {
  user: any = {}; // Đối tượng chứa thông tin người dùng

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    const userData = this.userDataService.getUserData();
    if (userData) {
      const user_id = userData.user_id;
      this.userDataService.getUserInfoFromBackend(user_id)
        .then(userInfo => {
          this.user = userInfo;
        })
        .catch(error => {
          console.error('Error fetching user information:', error);
        });
    }
  }
}
