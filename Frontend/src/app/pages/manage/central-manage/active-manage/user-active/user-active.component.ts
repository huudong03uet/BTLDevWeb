import { Component } from '@angular/core';

@Component({
  selector: 'app-user-active',
  templateUrl: './user-active.component.html',
  styleUrls: ['./user-active.component.scss']
})
export class UserActiveComponent {
  order_by: string = 'asc';
  attr_sort: string = '';
}
