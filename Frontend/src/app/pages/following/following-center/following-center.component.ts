import { ChangeDetectorRef, Component, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-following-center',
  templateUrl: './following-center.component.html',
  styleUrls: ['./following-center.component.scss']
})
export class FollowingCenterComponent implements OnChanges {
  @Input() recentChecked: boolean = false;
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
    private http: HttpClient,

  ) { }



  fetchData(): void {
    const userId = this.userData.getUserData()?.user_id;
    if (userId) {
      const apiUrlFollow = `${this.myService.getApiHost()}/pen/getFollow?user_id=${userId}&x=${this.recentChecked}`;
      const apiUrlNotFollow = `${this.myService.getApiHost()}/user/getNotFollow/${userId}`;
  
      // Use Angular HttpClient for HTTP requests
      this.http.get(apiUrlFollow).subscribe(
        (followResponse: any) => {
          this.pen_ids = followResponse;
        },
        (followError) => {
          console.error('Error fetching follow data:', followError);
        }
      );
  
      this.http.get(apiUrlNotFollow).subscribe(
        (notFollowResponse: any) => {
          // Avoid sorting in the component
          this.data = notFollowResponse.slice(0, 3);
        },
        (notFollowError) => {
          console.error('Error fetching not follow data:', notFollowError);
        }
      );
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
    // print changes of recentChecked
    this.fetchData();
  }
}

