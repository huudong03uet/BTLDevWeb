import { Component, Input, OnInit } from '@angular/core';
import { HostService } from 'src/app/host.service';
import axios from 'axios';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss']
})
export class ListCommentsComponent implements OnInit {
  @Input() deleted: boolean = false;
  @Input() attr_sort: string = '';
  @Input() order_by: string = '';

  @Input() datas: any;

  constructor(
    private myService: HostService,
  ) {}

  ngOnInit(): void {
    let apiUrl = this.myService.getApiHost() + `/comment/getAll?attr_sort=${this.attr_sort}&order_by=${this.order_by}&deleted=${this.deleted}`;

    axios.get(apiUrl).then((response) => {
      this.datas = response.data;
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
