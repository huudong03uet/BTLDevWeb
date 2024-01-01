import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/app/host.service';

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

  constructor(private http: HttpClient, private myService: HostService) { }

  ngOnInit() {
    this.http.post<any>(this.myService.getApiHost() + '/your-work/deleted', {}).subscribe(response => {
      this.list_deleted = response.deletedItems;
    });
  }

  restoreItem(item: DeletedItem) {
    const endpoint = item.type === 'pen' ? '/pen/createOrUpdatePen' : '/your-work/collections/restore';
    
    this.http.post<any>(this.myService.getApiHost() + endpoint, {
      [item.type + '_id']: item.id, // Dynamic key based on item type
      restore: true
    }).subscribe(response => {
      console.log(response);
    });
  }

  deletePermanently(item: DeletedItem) {
    const deleteEndpoint = item.type === 'pen'
      ? '/pen/deletePenPermanently'
      : '/your-work/deleteCollectionPermanently';

    const confirmed = confirm(`Are you sure you want to permanently delete ${item.name}?`);

    if (confirmed) {
      this.http.post<any>(this.myService.getApiHost() + deleteEndpoint, {
        [item.type + '_id']: item.id, // Dynamic key based on item type
      }).subscribe(
        response => {
          console.log(response);
          alert('Item deleted permanently successfully!');
        },
        error => {
          console.error(error);
          alert('Error deleting item permanently. Please try again.');
        }
      );
    }
  }
}
