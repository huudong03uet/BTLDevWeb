import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-loved-project',
  templateUrl: './loved-project.component.html',
  styleUrls: ['./loved-project.component.scss']
})
export class LovedProjectComponent implements OnInit {
  project : any;

  constructor(
    private userData: UserDataService,
    private myService: HostService,
  ) { }

  ngOnInit(): void {
    const userId = this.userData.getUserData()?.user_id;

    let apiUrl = this.myService.getApiHost() + `/project/getProjectByUserSort?user_id=${userId}&sortby=like`;

    axios.get(apiUrl).then((response) => {
      this.project = response.data;
      // console.log("like like like", response.data);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
