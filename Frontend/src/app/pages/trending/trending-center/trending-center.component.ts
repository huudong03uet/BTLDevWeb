import { ChangeDetectorRef, Component, Input, NgZone, OnInit, } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-trending-center',
  templateUrl: './trending-center.component.html',
  styleUrls: ['./trending-center.component.scss']
})
export class TrendingCenterComponent  {
  data = [2, 3, 3]
  pen_ids = [
    1, 2, 3, 3, 3, 2, 3
  ]
  constructor(
    private route: ActivatedRoute,
    private userData: UserDataService,
    private myService: HostService,
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {

      const userId = this.userData.getUserData()?.user_id;
      if (userId) {
        let apiUrl = this.myService.getApiHost() +  `/pen/getTrending`;

        axios.get(apiUrl).then((response) => {
          this.pen_ids = response.data;

          // get 3 first element      // cái này là lấy 3 cái đầu tiên
          // this.data = this.data.slice(0, 3);

          // console.log('trendding', this.data)
        }).catch((error) => {
          console.error('Error:', error);
        });

        const apiUrlNotFollow = `${this.myService.getApiHost()}/follow/getNotFollow?user_id=${userId}`;        
        axios.get(apiUrlNotFollow).then((response) => {
          this.data = response.data;
          // get random 3 element
          this.data = this.data.slice(0, 3);
        }).catch((error) => {
          console.error('Error:', error);
        });
      } else {
        console.error('User ID not available.');
      }


    });
  }
}