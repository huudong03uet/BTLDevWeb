import { Component } from '@angular/core';

@Component({
  selector: 'app-project-deleted',
  templateUrl: './project-deleted.component.html',
  styleUrls: ['./project-deleted.component.scss']
})
export class ProjectDeletedComponent {
  order_by: string = 'asc';
  attr_sort: string = '';
}
