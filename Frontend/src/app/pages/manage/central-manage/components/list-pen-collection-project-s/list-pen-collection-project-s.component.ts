import { Component, Input, OnInit } from '@angular/core';
import { HostService } from 'src/app/host.service';
import axios from 'axios';
import { max } from 'rxjs';
import { FullOptionControlItemService } from 'src/app/services/full-option-control-item.service';

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
    private fullOptionControlItemService: FullOptionControlItemService,
  ) { }
  // publicPrivate: string = 'all';
  dataPass: any[] = [];
  ngOnInit(): void {
    let apiUrl = '';

    if (this.type == 'pen') {
      apiUrl = this.myService.getApiHost() + `/pen/getAllPen?attr_sort=${this.attr_sort}&order_by=${this.order_by}&deleted=${this.deleted}`;
    } else if (this.type == 'collection') {
      apiUrl = this.myService.getApiHost() + `/collection/getAllCollection?attr_sort=${this.attr_sort}&order_by=${this.order_by}&deleted=${this.deleted}`;
    } else if (this.type == 'project') {
      apiUrl = this.myService.getApiHost() + `/project/getAllProject?attr_sort=${this.attr_sort}&order_by=${this.order_by}&deleted=${this.deleted}`;
    }

    axios.get(apiUrl).then((response) => {
      this.datas = response.data;
      this.dataPass = response.data;
      console.log("this.datas", this.datas)
      this.onChangesFinetune();
    }).catch((error) => {
      console.error('Error:', error);
    });



    this.fullOptionControlItemService.currentMessageSortBy.subscribe(message => {
      if (message) {
        console.log("message", message)
        this.sortBy = message;
        this.dataPass = this.sortByOptions();
        this.onChangesFinetune();
      }
    }
    );

    this.fullOptionControlItemService.currentMessageSortDirection.subscribe(message => {
      if (message) {
        // revert array
        this.sortDirection = message;

        this.dataPass = this.sortByOptions();
        this.onChangesFinetune();
      }
    }
    );

    this.fullOptionControlItemService.currentMessageSearchFor.subscribe(message => {
      if (message) {

        if (message === "qwertyuiop") {
          message = ""
        }
        this.searchFor = message;

        this.dataPass = this.sortByOptions();
        this.onChangesFinetune();
      }
    }
    );

    this.fullOptionControlItemService.currentMessageSelectPublicPrivate.subscribe(message => {
      if (message) {
        this.publicPrivate = message;
        this.dataPass = this.sortByOptions();
        this.onChangesFinetune();
      }
    }
    );


  }

  searchFor: string = '';
  sortBy: string = 'date_updated';
  sortDirection: string = 'asc';
  publicPrivate: string = 'all';
  sortByOptions() {
    let pen_full_searchFor = this.datas.filter((pen: { name: any; }) => {
   
      if (typeof pen.name !== 'string') {
        pen.name = "Untitled"
      }
      return pen.name.toLowerCase().includes(this.searchFor.toLowerCase())
    });
    console.log("after searchFor", pen_full_searchFor)

    if (this.sortBy === 'date_created') {
      // "2023-11-18T09:46:39.000Z" -> is date format
      pen_full_searchFor.sort((a: { createdAtRaw: string; }, b: { createdAtRaw: string; }) => {
        let dateA = new Date(a.createdAtRaw);
        let dateB = new Date(b.createdAtRaw);
        if (this.sortDirection === 'asc') {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      }
      );
    } else if (this.sortBy === 'date_updated') {
      pen_full_searchFor.sort((a: { updatedAtRaw: string; }, b: { updatedAtRaw: string; }) => {
        let dateA = new Date(a.updatedAtRaw);
        let dateB = new Date(b.updatedAtRaw);
        if (this.sortDirection === 'asc') {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      });
    }
    console.log("after sort", pen_full_searchFor)

    if (this.publicPrivate === 'public') {
      pen_full_searchFor = pen_full_searchFor.filter((pen: { status: string; }) => pen.status === "public");
    }
    if (this.publicPrivate === 'private') {
      pen_full_searchFor = pen_full_searchFor.filter((pen: { status: string; }) => pen.status === "private");
    }
    return pen_full_searchFor;
  }


  onChangesFinetune() {
    console.log("123", this.dataPass)
    this.pen_ids_current = this.dataPass.slice(0, this.max_item_per_page);
    this.check_is_start_end();
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

    if (this.page_now * this.max_item_per_page >= this.dataPass.length) {
      this.is_end = true;
    } else {
      this.is_end = false;
    }
  }



  // ngOnChanges() {
  ngOnChanges() {
    this.onChangesFinetune()
  }


  clickNextPageButton() {
    this.page_now += 1;
    this.pen_ids_current = this.dataPass.slice((this.page_now - 1) * this.max_item_per_page, this.page_now * this.max_item_per_page);
    this.check_is_start_end();
  }

  clickPrevPageButton() {
    this.page_now -= 1;
    this.pen_ids_current = this.dataPass.slice((this.page_now - 1) * this.max_item_per_page, this.page_now * this.max_item_per_page);
    this.check_is_start_end();
  }
}
