import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-private-project',
  templateUrl: './private-project.component.html',
  styleUrls: ['./private-project.component.scss']
})
export class PrivateProjectComponent implements OnInit {
  project : any;

  constructor(
    private userData: UserDataService,
    private myService: HostService,
  ) { }

  ngOnInit(): void {
    const userId = this.userData.getUserData()?.user_id;

    let apiUrl = this.myService.getApiHost() + `/project/getProjectByUserSort?user_id=${userId}&sortby=private`;

    axios.get(apiUrl).then((response) => {
      this.project = response.data;
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
