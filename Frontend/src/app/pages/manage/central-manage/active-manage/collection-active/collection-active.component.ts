import { Component } from '@angular/core';

@Component({
  selector: 'app-collection-active',
  templateUrl: './collection-active.component.html',
  styleUrls: ['./collection-active.component.scss']
})
export class CollectionActiveComponent {
  order_by: string = 'asc';
  attr_sort: string = '';
}
