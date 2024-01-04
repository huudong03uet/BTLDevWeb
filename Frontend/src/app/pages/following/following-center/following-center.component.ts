import { ChangeDetectorRef, Component, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-following-center',
  templateUrl: './following-center.component.html',
  styleUrls: ['./following-center.component.scss']
})
export class FollowingCenterComponent implements OnChanges {
  @Input() recentChecked: any;
  x: string = '';
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
    private myService: HostService,
  ) { }

  fetchData(): void {
    const userId = this.userData.getUserData()?.user_id;
    if (userId) {
      if(this.recentChecked == true) {
        this.x = 'true';
      } else {
        this.x = '';
      }
      let apiUrl = this.myService.getApiHost() + `/pen/getFollow?user_id=${userId}&x=${this.x}`;

      axios.get(apiUrl).then((response) => {
        this.pen_ids = response.data;
      }).catch((error) => {
        console.error('Error:', error);
      });


      apiUrl = this.myService.getApiHost() + `/user/getNotFollow/${userId}`;

      axios.get(apiUrl).then((response) => {
        this.data = response.data;
        this.data = this.data.sort(() => Math.random() - Math.random()).slice(0, 3);
      }).catch((error) => {
        console.error('Error:', error);
      });
    } else {
      console.error('User ID not available.');
    }
  }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fetchData();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.fetchData();
  }
}

