import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { HostService } from 'src/app/host.service';
import { FullOptionControlItemService } from 'src/app/services/full-option-control-item.service';
import axios from 'axios';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface CollectionApiResponse {
  collections?: any[];
  user?: any;
  pen_ids: any[];
}

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  animations: [
    trigger('likeAnimation', [
      state('unliked', style({
        transform: 'scale(1)',
      })),
      state('liked', style({
        transform: 'scale(1.2)',
        color: '#FF1493'  // Change the color to the one you desire
      })),
      transition('unliked <=> liked', animate('300ms ease-in-out')),
    ]),
  ],
})
export class CollectionComponent implements OnInit, AfterViewInit {
  @Input() currentCollectionID: any;
  user: any = {};
  pen_ids: any[] = [1];
  pen_full: any = [];
  collectionName: string = "em khong biet";
  userName: string = "em khong biet";
  userLikedCollection: boolean = false;
  likeAnimationState: string = 'unliked';
  searchFor: string = '';
  sortBy: string = 'date_updated';
  sortDirection: string = 'asc';
  publicPrivate: string = 'all';

  constructor(
    private http: HttpClient,
    private userData: UserDataService,
    private route: ActivatedRoute,
    private myService: HostService,
    private fullOptionControlItemService: FullOptionControlItemService,
  ) { }

  ngOnInit(): void {
    const user = this.userData.getUserData();
    if (!user) {
      return;
    }
    const userId = user.user_id;
    this.route.params.subscribe(params => {
      this.currentCollectionID = params['id'];
      this.getPensInCollection(this.currentCollectionID);
    });

    this.http.get<CollectionApiResponse>(this.myService.getApiHost() + `/your-work/collections/user/${userId}`).subscribe(
      (response) => {
        this.user = response.user || {};
        this.userName = this.user.name;
      }, (error) => {
        console.error('Error fetching user information and collection:', error);
      }
    );

  }

  private getPensInCollection(collectionId: number): void {
    this.http.get(this.myService.getApiHost() + `/your-work/collections/${collectionId}/pens`).subscribe(
      (response: any) => {
        this.pen_ids = response.pen_ids || [];
        // console.log(this.pen_ids);
        this.collectionName = response.collectionName;

        for (let i = 0; i < this.pen_ids.length; i++) {

          const apiUrl = this.myService.getApiHost() + `/pen/getInfoPen?pen_id=${this.pen_ids[i]}&user_id=${this.userData.getUserData()?.user_id}`;
          axios.get(apiUrl)
            .then((response) => {
              this.pen_full.push(response.data.pen);
            }).catch((error) => {
              console.error('Error:', error);
            });
        }
      }, (error) => {
        console.error('Error fetching the list of pens in the collection:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.fullOptionControlItemService.currentMessageSortBy.subscribe(message => {
      if (message) {
        // console.log("sortBy " + message)
        this.sortBy = message;
        // console.log("123", this.pen_ids)
        this.pen_ids = this.sortByOptions();
        // console.log("1234", this.pen_ids)
      }
    });

    this.fullOptionControlItemService.currentMessageSortDirection.subscribe(message => {
      if (message) {
        // console.log("sortDirection " + message)
        this.sortDirection = message;
        this.pen_ids = this.sortByOptions();
      }
    });

    this.fullOptionControlItemService.currentMessageSearchFor.subscribe(message => {
      if (message) {
        // console.log("searchFor " + message)

        if (message === "qwertyuiop") {
          message = ""
        }
        this.searchFor = message;

        this.pen_ids = this.sortByOptions();
      }
    });

    this.fullOptionControlItemService.currentMessageSelectPublicPrivate.subscribe(message => {
      if (message) {
        // console.log("publicPrivate " + message)
        this.publicPrivate = message;
        this.pen_ids = this.sortByOptions();
      }
    });
  }

  sortByOptions() {
    let pen_full_searchFor = this.pen_full.filter((pen: { name: any; }) => { 
      if (typeof pen.name !== 'string') {
        pen.name = "Chưa đặt tên"
      }
      return pen.name.toLowerCase().includes(this.searchFor.toLowerCase())
    });
    // console.log("after searchFor", pen_full_searchFor)

    if (this.sortBy === 'date_created') {
      // "2023-11-18T09:46:39.000Z" -> is date format
      pen_full_searchFor.sort((a: { createdAt: string; }, b: { createdAt: string; }) => {
        let dateA = new Date(a.createdAt);
        let dateB = new Date(b.createdAt);
        if (this.sortDirection === 'asc') {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      });
    } else if (this.sortBy === 'date_updated') {
      pen_full_searchFor.sort((a: { updatedAt: string; }, b: { updatedAt: string; }) => {
        let dateA = new Date(a.updatedAt);
        let dateB = new Date(b.updatedAt);
        if (this.sortDirection === 'asc') {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      });
    }
    // console.log("after sort", pen_full_searchFor)
    if (this.publicPrivate === 'public') {
      pen_full_searchFor = pen_full_searchFor.filter((pen: { status: string; }) => pen.status === "public");
    }
    if (this.publicPrivate === 'private') {
      pen_full_searchFor = pen_full_searchFor.filter((pen: { status: string; }) => pen.status === "private");
    }
    // console.log("after publicPrivate", pen_full_searchFor)
    return pen_full_searchFor.map((pen: { pen_id: any; }) => pen.pen_id);
  }

  isLiked: boolean = false;

  toggleLike() {
    const user = this.userData.getUserData();
    if (!user) {
      return;
    }
    this.isLiked = !this.isLiked;
    this.likeAnimationState = this.isLiked ? 'liked' : 'unliked';
    const user_id = user.user_id;

    this.http.get(this.myService.getApiHost() + `/your-work/collection/${this.currentCollectionID}/likeStatus/${user_id}`).subscribe(
      (response: any) => {
        this.userLikedCollection = response.userLikedCollection;
        if (this.userLikedCollection) {
          this.http.post(this.myService.getApiHost() + `/your-work/collection/removeLike`, { collection_id: this.currentCollectionID, user_id }).subscribe(
            () => {
              this.userLikedCollection = false;
            },
            (error) => {
              console.error('Error removing like:', error);
            }
          );
        } else {
          this.http.post(this.myService.getApiHost() + `/your-work/collection/addLike`, { collection_id: this.currentCollectionID, user_id }).subscribe(
            () => {
              this.userLikedCollection = true;
            },
            (error) => {
              console.error('Error adding like:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error checking like status:', error);
      }
    );
  }
}

