import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.post<any>('http://localhost:3000/your-work/deleted', {}).subscribe(response => {
      this.list_deleted = response.deletedItems;
    });
  }

  restoreItem(item: DeletedItem) {
    if (item.type === 'pen') {
      this.http.post<any>('http://localhost:3000/pen/createOrUpdatePen', {
        pen_id: item.id,
        restore: true
      }).subscribe(response => {
        console.log(response);
      });
    } else if (item.type === 'collection') {
      this.http.post<any>('http://localhost:3000/your-work/collections/restore', {
        collection_id: item.id
      }).subscribe(response => {
        console.log(response);
      });
    }
  }
}
