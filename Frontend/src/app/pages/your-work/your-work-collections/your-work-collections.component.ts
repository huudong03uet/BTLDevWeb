import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { HttpClient } from '@angular/common/http';

// Create an interface for the API response
interface CollectionApiResponse {
  collections?: any[]; // Replace 'any' with the actual type of your collections
  user?: any; // Add user type if the API response includes user data
}

@Component({
  selector: 'app-your-work-collections',
  templateUrl: './your-work-collections.component.html',
  styleUrls: ['./your-work-collections.component.scss']
})
export class YourWorkCollectionsComponent implements OnInit {
  collections: any[] = [];
  collection_ids_current: any[] = [];
  page_now = 1;
  is_end = false;
  is_start = true;

  constructor(
    private http: HttpClient,
    private userData: UserDataService
  ) {}

  ngOnInit(): void {
    // Check if the user is logged in
    const user = this.userData.getUserData();
    if (!user) {
      // Handle the case where the user is not logged in
      // You might want to navigate to the login page or show an error message
      return;
    }

    // Get user ID from user data
    const userId = user.user_id;

    // Fetch collections and user data by user ID
    this.http.get<CollectionApiResponse>(`http://localhost:3000/your-work/collections/user/${userId}`).subscribe(
      (response) => {
        this.collections = response.collections || [];
        this.updateCollectionData();
      },
      (error) => {
        console.error('Error fetching collections and user data:', error);
      }
    );
  }

  private updateCollectionData(): void {
    const startIndex = (this.page_now - 1) * 6;
    const endIndex = this.page_now * 6;
    this.collection_ids_current = this.collections.slice(startIndex, endIndex);
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
