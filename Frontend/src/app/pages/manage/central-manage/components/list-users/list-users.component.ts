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
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
