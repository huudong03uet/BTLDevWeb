import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { HostService } from 'src/app/host.service';
import { FullOptionControlItemService } from 'src/app/services/full-option-control-item.service';

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
  collection_full: any = [];
  searchFor: string = '';
  sortBy: string = 'date_updated';
  sortDirection: string = 'asc';
  publicPrivate: string = 'all';

  constructor(
    private http: HttpClient,
    private userData: UserDataService,
    private myService: HostService,
    private fullOptionControlItemService: FullOptionControlItemService,
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
      this.collection_full = collections;
      this.collection_ids = this.collection_full;
    }).catch((error) => {
      console.error('Error:', error);
    });
    this.fullOptionControlItemService.currentMessageSortBy.subscribe(message => {
      if (message) {
        this.sortBy = message;
        this.collection_ids = this.sortByOptions();
      }
    }
    );

    this.fullOptionControlItemService.currentMessageSortDirection.subscribe(message => {
      if (message) {
        this.sortDirection = message;
        this.collection_ids = this.sortByOptions();
      }
    }
    );

    this.fullOptionControlItemService.currentMessageSearchFor.subscribe(message => {
      if (message) {

        if(message === "qwertyuiop"){
          message = ""
        }
        this.searchFor = message;

        
        this.collection_ids = this.sortByOptions();
      }
    }
    );

    this.fullOptionControlItemService.currentMessageSelectPublicPrivate.subscribe(message => {
      if (message) {
        this.publicPrivate = message;
        this.collection_ids = this.sortByOptions();
      }
    }
    );
  }


  sortByOptions() {
    let collection_full_searchFor = this.collection_full.filter((pen: { name: any; }) => { 
      // if name != string, set name = "Chưa đặt tên"
      if (typeof pen.name !== 'string') {
        pen.name = "Chưa đặt tên"
      }
      return pen.name.toLowerCase().includes(this.searchFor.toLowerCase())
    });

    if (this.sortBy === 'date_created') {
      // "2023-11-18T09:46:39.000Z" -> is date format
      collection_full_searchFor.sort((a: { createdAt: string; }, b: { createdAt: string; }) => {
        let dateA = new Date(a.createdAt);
        let dateB = new Date(b.createdAt);
        if (this.sortDirection === 'asc') {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      }
      );
    } else if (this.sortBy === 'date_updated') {
      collection_full_searchFor.sort((a: { updatedAt: string; }, b: { updatedAt: string; }) => {
        let dateA = new Date(a.updatedAt);
        let dateB = new Date(b.updatedAt);
        if (this.sortDirection === 'asc') {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      });
    }
    if (this.publicPrivate === 'public') {
      collection_full_searchFor = collection_full_searchFor.filter((pen: { status: string; }) => pen.status === "public");
    }
    if (this.publicPrivate === 'private') {
      collection_full_searchFor = collection_full_searchFor.filter((pen: { status: string; }) => pen.status === "private");
    }
    return collection_full_searchFor;
  }
}
