import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss']
})
export class ListCommentsComponent {
  @Input() deleted: boolean = false;
  
  @Input() datas: any = [
    {
      "title": "Pen 1",
      "comment": "Comment 1",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "link": "https://codepen.io/pen/1"
    }, {
      "title": "Pen 2",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "comment": "Comment 1",
      "link": "https://codepen.io/pen/2"
    }, {
      "title": "Pen 3",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "comment": "Comment 1",
      "link": "https://codepen.io/pen/3"
    }, {
      "title": "Pen 4",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01","comment": "Comment 1",
      "link": "https://codepen.io/pen/4"
    }, {
      "title": "Pen 5",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "comment": "Comment 1",
      "link": "https://codepen.io/pen/5"
    }, {
      "title": "Pen 6",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "comment": "Comment 1",
      "link": "https://codepen.io/pen/6"
    }, {
      "title": "Pen 7",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "comment": "Comment 1",
      "link": "https://codepen.io/pen/7"
    }, {
      "title": "Pen 8",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "comment": "Comment 1",
      "link": "https//codepen.io/pen/8"
    }, {
      "title": "Pen 9",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "comment": "Comment 1",
      "link": "https://codepen.io/pen/9"
    }, {
      "title": "Pen 10",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "comment": "Comment 1",
      "link": "https://codepen.io/pen/10"
    }
  ]
}
