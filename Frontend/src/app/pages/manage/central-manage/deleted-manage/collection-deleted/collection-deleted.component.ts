import { Component } from '@angular/core';

@Component({
  selector: 'app-collection-deleted',
  templateUrl: './collection-deleted.component.html',
  styleUrls: ['./collection-deleted.component.scss']
})
export class CollectionDeletedComponent {
  order_by: string = 'asc';
  attr_sort: string = '';
}
