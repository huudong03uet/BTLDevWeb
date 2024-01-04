import { Component } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { HostService } from 'src/app/host.service';
import { FullOptionControlItemService } from 'src/app/services/full-option-control-item.service';
@Component({
  selector: 'app-your-work-pens',
  templateUrl: './your-work-pens.component.html',
  styleUrls: ['./your-work-pens.component.scss']
})
export class YourWorkPensComponent {
  pen_ids: any[] = []
  pen_full: any = []

  searchFor: string = '';
  sortBy: string = 'date_updated';
  sortDirection: string = 'asc';
  publicPrivate: string = 'all';




  sortByOptions() {
    let pen_full_searchFor = this.pen_full.filter((pen: { name: any; }) => { 
      // if name != string, set name = "Chưa đặt tên"
      if (typeof pen.name !== 'string') {
        pen.name = "Chưa đặt tên"
      }
      return pen.name.toLowerCase().includes(this.searchFor.toLowerCase())
    });
    console.log("after searchFor", pen_full_searchFor)

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
      }
      );
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
    console.log("after sort", pen_full_searchFor)

    if (this.publicPrivate === 'public') {
      pen_full_searchFor = pen_full_searchFor.filter((pen: { status: string; }) => pen.status === "public");
    }
    if (this.publicPrivate === 'private') {
      pen_full_searchFor = pen_full_searchFor.filter((pen: { status: string; }) => pen.status === "private");
    }
    return pen_full_searchFor.map((pen: { pen_id: any; }) => pen.pen_id);
  }

  constructor(
    private route: ActivatedRoute,
    private userData: UserDataService,
    private myService: HostService,
    private fullOptionControlItemService: FullOptionControlItemService,
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = this.userData.getUserData()?.user_id;
      if (userId) {
        const apiUrl = this.myService.getApiHost() + `/pen/getPenByUserIdFullOption/${userId}`;

        axios.get(apiUrl)
          .then((response) => {
            this.pen_full = response.data
            this.pen_ids = this.pen_full.map((pen: { pen_id: any; }) => pen.pen_id);

          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        console.error('User ID not available.');
      }
    });

    this.fullOptionControlItemService.currentMessageSortBy.subscribe(message => {
      if (message) {
        console.log("message", message)
        this.pen_ids = this.sortByOptions();
      }
    }
    );

    this.fullOptionControlItemService.currentMessageSortDirection.subscribe(message => {
      if (message) {
        this.sortDirection = message;
        this.pen_ids = this.sortByOptions();
      }
    }
    );

    this.fullOptionControlItemService.currentMessageSearchFor.subscribe(message => {
      if (message) {

        if(message === "qwertyuiop"){
          message = ""
        }
        this.searchFor = message;

        
        this.pen_ids = this.sortByOptions();
      }
    }
    );

    this.fullOptionControlItemService.currentMessageSelectPublicPrivate.subscribe(message => {
      if (message) {
        this.publicPrivate = message;
        this.pen_ids = this.sortByOptions();
      }
    }
    );
  }


}
