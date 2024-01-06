import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-public-project',
  templateUrl: './public-project.component.html',
  styleUrls: ['./public-project.component.scss']
})
export class PublicProjectComponent implements OnInit {
  project : any;

  constructor(
    private userData: UserDataService,
    private myService: HostService,
  ) { }

  ngOnInit(): void {
    const userId = this.userData.getUserData()?.user_id;

    let apiUrl = this.myService.getApiHost() + `/project/getProjectByUserSort?user_id=${userId}&sortby=numview`;

    axios.get(apiUrl).then((response) => {
      this.project = response.data;
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
