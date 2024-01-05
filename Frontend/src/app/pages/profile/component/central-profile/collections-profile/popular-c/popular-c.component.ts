import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-popular-c',
  templateUrl: './popular-c.component.html',
  styleUrls: ['./popular-c.component.scss']
})
export class PopularCComponent implements OnInit {
  collections : any;

  constructor(
    private userData: UserDataService,
    private myService: HostService,
  ) { }

  ngOnInit(): void {
    const userId = this.userData.getUserData()?.user_id;

    let apiUrl = this.myService.getApiHost() + `/collection/getCollectionByUserSort?user_id=${userId}&sortby=numview`;

    axios.get(apiUrl).then((response) => {
      this.collections = response.data;
      // console.log("like like like", response.data);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
