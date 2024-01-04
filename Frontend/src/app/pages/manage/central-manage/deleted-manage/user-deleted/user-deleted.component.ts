import { Component } from '@angular/core';

@Component({
  selector: 'app-user-deleted',
  templateUrl: './user-deleted.component.html',
  styleUrls: ['./user-deleted.component.scss']
})
export class UserDeletedComponent {
  order_by: string = 'asc';
  attr_sort: string = '';
}
