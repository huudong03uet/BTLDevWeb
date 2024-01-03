import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-pen-collection-project-s',
  templateUrl: './list-pen-collection-project-s.component.html',
  styleUrls: ['./list-pen-collection-project-s.component.scss']
})
export class ListPenCollectionProjectSComponent {
  // Title		Created	Last Updated	Stats
  @Input() deleted: boolean = false;
  
  @Input() datas: any = [
    {
      "title": "Pen 1",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "likes": "0",
      "views": "0",
      "comments": "0",
      "link": "https://codepen.io/pen/1"
    }, {
      "title": "Pen 2",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "likes": "0",
      "views": "0",
      "comments": "0",
      "link": "https://codepen.io/pen/2"
    }, {
      "title": "Pen 3",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "likes": "0",
      "views": "0",
      "comments": "0",
      "link": "https://codepen.io/pen/3"
    }, {
      "title": "Pen 4",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "likes": "0",
      "views": "0",
      "comments": "0",
      "link": "https://codepen.io/pen/4"
    }, {
      "title": "Pen 5",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "likes": "0",
      "views": "0",
      "comments": "0",
      "link": "https://codepen.io/pen/5"
    }, {
      "title": "Pen 6",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "likes": "0",
      "views": "0",
      "comments": "0",
      "link": "https://codepen.io/pen/6"
    }, {
      "title": "Pen 7",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "likes": "0",
      "views": "0",
      "comments": "0",
      "link": "https://codepen.io/pen/7"
    }, {
      "title": "Pen 8",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "likes": "0",
      "views": "0",
      "comments": "0",
      "link": "https//codepen.io/pen/8"
    }, {
      "title": "Pen 9",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "likes": "1",
      "views": "1",
      "comments": "1",
      "link": "https://codepen.io/pen/9"
    }, {
      "title": "Pen 10",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "likes": "1",
      "views": "1",
      "comments": "1",
      "link": "https://codepen.io/pen/10"
    }
  ]
}
