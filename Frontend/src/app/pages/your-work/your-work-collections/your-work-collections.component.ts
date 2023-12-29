import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { HttpClient } from '@angular/common/http';

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
  collection_ids_current: number[] = [];
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

    this.http.get<{ collections: Collection[] }>(`http://localhost:3000/your-work/collections/user/${userId}`).subscribe(
      (response) => {
        this.collections = response.collections || [];
        this.updateCollectionData();
      },
      (error) => {
        console.error('Error fetching collections:', error);
      }
    );
  }

  private updateCollectionData(): void {
    const startIndex = (this.page_now - 1) * 6;
    const endIndex = this.page_now * 6;
    
    const validEndIndex = Math.min(endIndex, this.collections.length);
    
    const collectionsForCurrentPage = this.collections.slice(startIndex, validEndIndex);
  
    this.collection_ids_current = collectionsForCurrentPage.map(collection => collection.collection_id);
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
