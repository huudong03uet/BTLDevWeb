import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-deleted',
  templateUrl: './comment-deleted.component.html',
  styleUrls: ['./comment-deleted.component.scss']
})
export class CommentDeletedComponent {
  order_by: string = 'asc';
  attr_sort: string = '';
}
