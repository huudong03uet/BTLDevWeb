import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/app/host.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface DeletedItem {
  id: number;
  name: string;
  type: string;
}

@Component({
  selector: 'app-your-work-deleted',
  templateUrl: './your-work-deleted.component.html',
  styleUrls: ['./your-work-deleted.component.scss']
})
export class YourWorkDeletedComponent implements OnInit {
  list_deleted: DeletedItem[] = [];

  constructor(
    private http: HttpClient,
    private myService: HostService,
    private UserData: UserDataService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.toastr.toastrConfig.positionClass = 'toast-top-center'; // Set toastr position
  }

  ngOnInit() {
    const user_id = this.UserData.getUserData()?.user_id; // Get the user_id from UserDataService
    this.http.post<any>(this.myService.getApiHost() + '/your-work/deleted', { user_id }).subscribe(response => {
      this.list_deleted = response.deletedItems;
    });
  }

  restoreItem(item: DeletedItem) {
    let endpoint = item.type === 'pen' ? '/pen/createOrUpdatePen' : '/your-work/collections/restore';

    if (item.type === 'project') {
      endpoint = `/project/restore`;
    }

    this.http.post<any>(this.myService.getApiHost() + endpoint, {
      [item.type + '_id']: item.id, // Dynamic key based on item type
      restore: true
    }).subscribe(response => {
      this.toastr.success('Item restored successfully!');
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.router.url]);
    });
  }

  deletePermanently(item: DeletedItem) {
    let deleteEndpoint = item.type === 'pen'
      ? '/pen/deletePenPermanently'
      : '/your-work/deleteCollectionPermanently';

    if (item.type === 'project') {
      deleteEndpoint = `/project/deleteProjectPermanently`;
    }

    const confirmed = confirm(`Are you sure you want to permanently delete ${item.name}?`);

    if (confirmed) {
      this.http.post<any>(this.myService.getApiHost() + deleteEndpoint, {
        [item.type + '_id']: item.id,
      }).subscribe(
        response => {
          console.log(response);
          this.toastr.success('Item deleted permanently successfully!');
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);
        },
        error => {
          console.error(error);
          this.toastr.error('Error deleting item permanently. Please try again.');
        }
      );
    }
  }
}
