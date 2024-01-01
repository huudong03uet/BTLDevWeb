import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { HostService } from 'src/app/host.service';

interface Collection {
  collection_id: number;
  name: string;
  status: string;
  user_id: number;
  // Add other properties if needed
}
@Component({
  selector: 'app-your-work-collections',
  templateUrl: './your-work-collections.component.html',
  styleUrls: ['./your-work-collections.component.scss']
})
export class YourWorkCollectionsComponent implements OnInit {
  collection_ids: any[] = [];

  constructor(
    private http: HttpClient,
    private userData: UserDataService,
    private myService: HostService,
  ) {}

  ngOnInit(): void {
    const user = this.userData.getUserData();
    if (!user) {
      return;
    }

    const userId = user.user_id;
    let apiUrl = this.myService.getApiHost() + `/your-work/collections/user/${userId}`;

    axios.get(apiUrl).then((response) => {
      let collections = response.data.collections;
      // console.log(data);
      // for (let item of data.collections) {
      //   .push(item.collection_id);
      // }
      // this.updateCollectionData();
      // this.collections = data.filter((item: any) => item.collection_id);
      
      this.collection_ids = collections
    }).catch((error) => {
      console.error('Error:', error);
    });
  }


}
