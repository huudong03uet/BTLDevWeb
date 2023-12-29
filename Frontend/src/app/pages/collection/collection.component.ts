import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface CollectionApiResponse {
  collections?: any[];
  user?: any;
  pen_ids?: any[];
}

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  currentCollectionID: any;
  user: any = {};
  pen_ids: any[] = [];
  collectionName: string = "";
  userName: string = "";

  constructor(
    private http: HttpClient,
    private userData: UserDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const user = this.userData.getUserData();
    if (!user) {
      console.log("Oh no");
      return;
    }
    const userId = user.user_id;

    // Use ActivatedRoute to get the value of collection_id
    this.route.params.subscribe(params => {
      this.currentCollectionID = params['id'];

      // Call getPensInCollection with currentCollectionID
      this.getPensInCollection(this.currentCollectionID);
      console.log(this.pen_ids);
    });

    this.http.get<CollectionApiResponse>(`http://localhost:3000/your-work/collections/user/${userId}`).subscribe(
      (response) => {
        this.user = response.user || {};
        this.userName = this.user.name;
        console.log(this.userName);
      },
      (error) => {
        console.error('Error fetching user information and collection:', error);
      }
    );
  }

  private getPensInCollection(collectionId: number): void {
    this.http.get(`http://localhost:3000/your-work/collections/${collectionId}/pens`).subscribe(
      (response: any) => {
        this.pen_ids = response.pen_ids || []; // Lấy chỉ pen_ids từ response
        console.log(this.pen_ids);
        this.collectionName = response.collectionName;
      },
      (error) => {
        console.error('Error fetching the list of pens in the collection:', error);
      }
    );
  }
}
