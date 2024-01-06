import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-private-c',
  templateUrl: './private-c.component.html',
  styleUrls: ['./private-c.component.scss']
})
export class PrivateCComponent implements OnInit {
  collections : any;

  constructor(
    private userData: UserDataService,
    private myService: HostService,
  ) { }

  ngOnInit(): void {
    const userId = this.userData.getUserData()?.user_id;

    let apiUrl = this.myService.getApiHost() + `/collection/getCollectionByUserSort?user_id=${userId}&sortby=private`;

    axios.get(apiUrl).then((response) => {
      this.collections = response.data;
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
