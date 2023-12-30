import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

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
  collections: Collection[] = [];
  collection_ids_current: any[] = [];
  page_now = 1;
  is_end = false;
  is_start = true;

  constructor(
    private http: HttpClient,
    private userData: UserDataService
  ) {}

  ngOnInit(): void {
    const user = this.userData.getUserData();
    if (!user) {
      return;
    }

    const userId = user.user_id;
    let apiUrl = `http://localhost:3000/your-work/collections/user/${userId}`;

    axios.get(apiUrl).then((response) => {
      this.collections = response.data.collections;
      // console.log(data);
      // for (let item of data.collections) {
      //   .push(item.collection_id);
      // }
      this.updateCollectionData();
      // this.collections = data.filter((item: any) => item.collection_id);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  private updateCollectionData(): void {
    const startIndex = (this.page_now - 1) * 6;
    const endIndex = this.page_now * 6;
    
    const validEndIndex = Math.min(endIndex, this.collections.length);
    
    this.collection_ids_current = this.collections.slice(startIndex, validEndIndex);
  
    //  = collectionsForCurrentPage;
    // console.log("error eorro", this.collections)
    this.check_is_start_end();
  }
  
  clickNextPageButton(): void {
    this.page_now += 1;
    this.updateCollectionData();
  }

  clickPrevPageButton(): void {
    this.page_now -= 1;
    this.updateCollectionData();
  }

  private check_is_start_end(): void {
    this.is_start = this.page_now === 1;
    this.is_end = this.page_now * 6 >= this.collections.length;
  }
}
