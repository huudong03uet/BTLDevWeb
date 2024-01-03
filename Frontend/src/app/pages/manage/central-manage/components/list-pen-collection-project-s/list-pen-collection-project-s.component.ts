import { Component, Input, OnInit } from '@angular/core';
import { HostService } from 'src/app/host.service';
import axios from 'axios';

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

      return;
      apiUrl = this.myService.getApiHost() + `/collection/getAllCollection?attr_sort=${this.attr_sort}&order_by=${this.order_by}&deleted=${this.deleted}`;
    }

    console.log(apiUrl);
    

    axios.get(apiUrl).then((response) => {
      this.datas = response.data;
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
