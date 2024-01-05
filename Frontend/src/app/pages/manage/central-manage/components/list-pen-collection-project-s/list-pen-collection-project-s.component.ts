import { Component, Input, OnInit } from '@angular/core';
import { HostService } from 'src/app/host.service';
import axios from 'axios';
import { max } from 'rxjs';

@Component({
  selector: 'app-list-pen-collection-project-s',
  templateUrl: './list-pen-collection-project-s.component.html',
  styleUrls: ['./list-pen-collection-project-s.component.scss']
})
export class ListPenCollectionProjectSComponent implements OnInit {
  @Input() deleted: boolean = false;
  @Input() attr_sort: string = '';
  @Input() order_by: string = '';
  @Input() type: string = 'pen';
  
  @Input() datas: any;
  max_item_per_page: number = 10;

  constructor(
    private myService: HostService,
  ) {}

  ngOnInit(): void {
    let apiUrl = '';

    if(this.type == 'pen') {
      apiUrl = this.myService.getApiHost() + `/pen/getAllPen?attr_sort=${this.attr_sort}&order_by=${this.order_by}&deleted=${this.deleted}`;
    } else if (this.type == 'collection') {
      apiUrl = this.myService.getApiHost() + `/collection/getAllCollection?attr_sort=${this.attr_sort}&order_by=${this.order_by}&deleted=${this.deleted}`;
    } else if (this.type == 'project') {
      apiUrl = this.myService.getApiHost() + `/project/getAllProject?attr_sort=${this.attr_sort}&order_by=${this.order_by}&deleted=${this.deleted}`;
    }

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
