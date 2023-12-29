import { ChangeDetectorRef, Component, Input, NgZone, OnInit, } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-trending-center',
  templateUrl: './trending-center.component.html',
  styleUrls: ['./trending-center.component.scss']
})
export class TrendingCenterComponent  {
  user_ids = [2, 3, 3]
  pen_ids = [
    1, 2, 3, 4
  ]
  constructor(
    private route: ActivatedRoute,
    private userData: UserDataService,
  ) { }


  //  lỗi gì đó chỗ này :v
  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     console.log('params', params)
  //     const userId = this.userData.getUserData()?.user_id;
  //     if (userId) {
  //       const apiUrl = `http://localhost:3000/pen//${userId}`;

  //       axios.get(apiUrl)
  //         .then((response) => {
  //           this.data = response.data;
  //           console.log('abcxyz', this.data)
  //         })
  //         .catch((error) => {
  //           console.error('Error:', error);
  //         });
  //     } else {
  //       console.error('User ID not available.');
  //     }
  //   });
  // }
}

