import { Component } from '@angular/core';

@Component({
  selector: 'app-pen-deleted',
  templateUrl: './pen-deleted.component.html',
  styleUrls: ['./pen-deleted.component.scss']
})
export class PenDeletedComponent {
  order_by: string = 'asc';
  attr_sort: string = '';
}
