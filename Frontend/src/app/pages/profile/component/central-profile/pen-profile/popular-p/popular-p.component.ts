import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';
import { HostService } from 'src/app/host.service';
@Component({
  selector: 'app-popular-p',
  templateUrl: './popular-p.component.html',
  styleUrls: ['./popular-p.component.scss']
})
export class PopularPComponent implements OnInit {
  listItem: any;

  constructor(
    private userData: UserDataService,
    private myService: HostService,
  ) { }


  ngOnInit(): void {
    const userId = this.userData.getUserData()?.user_id;

    let apiUrl = this.myService.getApiHost() + `/pen/getPenByUserSort?user_id=${userId}&sortby=view`;

    axios.get(apiUrl).then((response) => {
      this.listItem = response.data;
      // console.log(this.listItem);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
