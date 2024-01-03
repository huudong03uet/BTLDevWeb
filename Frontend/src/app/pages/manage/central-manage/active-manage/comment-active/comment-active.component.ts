import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-active',
  templateUrl: './comment-active.component.html',
  styleUrls: ['./comment-active.component.scss']
})
export class CommentActiveComponent {
  order_by: string = 'asc';
  attr_sort: string = '';
}
