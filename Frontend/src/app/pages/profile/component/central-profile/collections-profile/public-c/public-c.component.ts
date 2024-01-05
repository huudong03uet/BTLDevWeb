import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-public-c',
  templateUrl: './public-c.component.html',
  styleUrls: ['./public-c.component.scss']
})
export class PublicCComponent implements OnInit {
  collections : any;

  constructor(
    private userData: UserDataService,
    private myService: HostService,
  ) { }

  ngOnInit(): void {
    const userId = this.userData.getUserData()?.user_id;

    let apiUrl = this.myService.getApiHost() + `/collection/getCollectionByUserSort?user_id=${userId}&sortby=public`;

    axios.get(apiUrl).then((response) => {
      this.collections = response.data;
      // console.log("like like like", response.data);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
