import { Component } from '@angular/core';

@Component({
  selector: 'app-project-active',
  templateUrl: './project-active.component.html',
  styleUrls: ['./project-active.component.scss']
})
export class ProjectActiveComponent {
  order_by: string = 'asc';
  attr_sort: string = '';
}
