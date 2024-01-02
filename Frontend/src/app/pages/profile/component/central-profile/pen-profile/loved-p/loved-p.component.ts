import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';
import { HostService } from 'src/app/host.service';
@Component({
  selector: 'app-loved-p',
  templateUrl: './loved-p.component.html',
  styleUrls: ['./loved-p.component.scss']
})
export class LovedPComponent implements OnInit {
  pen_ids = []

  constructor(
    private userData: UserDataService,
    private myService: HostService,
  ) { }


  ngOnInit(): void {
    const userId = this.userData.getUserData()?.user_id;

    let apiUrl = this.myService.getApiHost() + `/pen/getPenByUserSort?user_id=${userId}&sortby=like`;

    axios.get(apiUrl).then((response) => {
      this.pen_ids = response.data;
      // console.log("like like like", response.data);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
