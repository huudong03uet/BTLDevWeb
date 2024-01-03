import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  @Input() deleted: boolean = false;
  
  @Input() datas: any = [
    {
      "title": "Pen 1",
      "gmail": "Comment 1",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "location": "Ha Noi",
      "bio": "I am a developer",
      "link": "https://codepen.io/pen/1"
    }, {
      "title": "Pen 2",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "gmail": "Comment 1",
      "location": "Ha Noi",
      "bio": "I am a developer",
      "link": "https://codepen.io/pen/2"
    }, {
      "title": "Pen 3",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "gmail": "Comment 1",
      "location": "Ha Noi",
      "bio": "I am a developer",
      "link": "https://codepen.io/pen/3"
    }, {
      "title": "Pen 4",
      "created": "2021-01-01",
      "location": "Ha Noi",
      "bio": "I am a developer",
      "lastUpdated": "2021-01-01","gmail": "Comment 1",
      "link": "https://codepen.io/pen/4"
    }, {
      "title": "Pen 5",
      "created": "2021-01-01",
      "location": "Ha Noi",
      "bio": "I am a developer",
      "lastUpdated": "2021-01-01",
      "gmail": "Comment 1",
      "link": "https://codepen.io/pen/5"
    }, {
      "title": "Pen 6",
      "created": "2021-01-01",
      "location": "Ha Noi",
      "bio": "I am a developer",
      "lastUpdated": "2021-01-01",
      "gmail": "Comment 1",
      "link": "https://codepen.io/pen/6"
    }, {
      "title": "Pen 7",
      "created": "2021-01-01",
       "location": "Ha Noi",
      "bio": "I am a developer",
      "lastUpdated": "2021-01-01",
      "gmail": "Comment 1",
      "link": "https://codepen.io/pen/7"
    }, {
      "title": "Pen 8",
      "location": "Ha Noi",
      "bio": "I am a developer",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "gmail": "Comment 1",
      "link": "https//codepen.io/pen/8"
    }, {
      "title": "Pen 9",
      "created": "2021-01-01",
      "lastUpdated": "2021-01-01",
      "location": "Ha Noi",
      "bio": "I am a developer",
      "gmail": "Comment 1",
      "link": "https://codepen.io/pen/9"
    }, {
      "title": "Pen 10",
      "created": "2021-01-01",
      "location": "Ha Noi",
      "bio": "I am a developer",
      "lastUpdated": "2021-01-01",
      "gmail": "Comment 1",
      "link": "https://codepen.io/pen/10"
    }
  ]
}
