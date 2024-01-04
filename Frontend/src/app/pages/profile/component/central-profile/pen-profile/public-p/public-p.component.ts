import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-public-p',
  templateUrl: './public-p.component.html',
  styleUrls: ['./public-p.component.scss']
})
export class PublicPComponent implements OnInit {
  pen_ids: any;

  constructor(
    private userData: UserDataService,
    private myService: HostService,
  ) { }


  ngOnInit(): void {
    const userId = this.userData.getUserData()?.user_id;

    let apiUrl = this.myService.getApiHost() + `/pen/getPenByUserSort?user_id=${userId}&sortby=public`;

    axios.get(apiUrl).then((response) => {
      this.pen_ids = response.data;
      // console.log(this.pen_ids);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
