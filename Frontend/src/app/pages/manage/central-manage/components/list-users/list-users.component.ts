import { Component, Input, OnInit } from '@angular/core';
import { HostService } from 'src/app/host.service';
import axios from 'axios';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  @Input() deleted: boolean = false;
  @Input() attr_sort: string = '';
  @Input() order_by: string = '';
  max_item_per_page: number = 10;
  @Input() datas: any = [
    {
      "user_id": 1,
      "avatar_path": null,
      "user_name": "User1",
      "gmail": "user1@gmail.com",
      "full_name": "em khong biet",
      "location": "em khong biet",
      "bio": "em khong biet",
      "links": null,
      "createdAt": "2023-09-13T10:35:13.000Z",
      "updatedAt": "2023-12-30T14:47:50.000Z"
    },
  ]

  constructor(
    private myService: HostService,
  ) {}

  ngOnInit(): void {
    let apiUrl = this.myService.getApiHost() + `/user/getAlluser?attr_sort=${this.attr_sort}&order_by=${this.order_by}&deleted=${this.deleted}`;

    axios.get(apiUrl).then((response) => {
      this.datas = response.data;

      this.pen_ids_current = this.datas.slice(0, this.max_item_per_page);
      this.check_is_start_end();
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  page_now: number = 1;
  pen_ids_current: any[] = [];
  is_end: boolean = false;
  is_start: boolean = true;


  check_is_start_end() {
    if (this.page_now == 1) {
      this.is_start = true;
    } else {
      this.is_start = false;
    }

    if (this.page_now * this.max_item_per_page >= this.datas.length) {
      this.is_end = true;
    } else {
      this.is_end = false;
    }
  }
  


  // ngOnChanges() {
    ngOnChanges() {
      this.pen_ids_current = this.datas.slice(0, this.max_item_per_page);
      this.check_is_start_end();
    }


  clickNextPageButton() {
    this.page_now += 1;
    this.pen_ids_current = this.datas.slice((this.page_now - 1) * this.max_item_per_page, this.page_now * this.max_item_per_page);
    this.check_is_start_end();
  }

  clickPrevPageButton() {
    this.page_now -= 1;
    this.pen_ids_current = this.datas.slice((this.page_now - 1) * this.max_item_per_page, this.page_now * this.max_item_per_page);
    this.check_is_start_end();
  }
}
