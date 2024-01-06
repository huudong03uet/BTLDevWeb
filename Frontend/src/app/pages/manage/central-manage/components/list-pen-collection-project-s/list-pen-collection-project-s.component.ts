import { Component, Input, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/app/host.service';
import { ToastrService } from 'ngx-toastr';
import { max } from 'rxjs';
import { FullOptionControlItemService } from 'src/app/services/full-option-control-item.service';

interface DeletedItem {
  id: number;
  name: string;
  type: string;
}

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
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
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

  handleDeleteClick(id: number) {
    const confirmed = confirm("Are you sure you want to delete this pen?");
    if (confirmed) {
      let url = '';
      let data;

      if (this.type == 'pen') {
        url = this.myService.getApiHost() + `/pen/createOrUpdatePen`;
        data = {
          pen_id: id,
          delete: true
        };
      } else if (this.type == "collection") {
        url = this.myService.getApiHost() + `/your-work/collections/removeCollection`;

        data = {
          collection_id: id,
          delete: true
        };
      }

      axios.post(url, data).then(response => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      }).catch(error => {
        console.error('Error:', error);
      });
    }
  }

  restoreItem(item: number) {
    let endpoint = this.type === 'pen' ? '/pen/createOrUpdatePen' : '/your-work/collections/restore';

    if (this.type === 'project') {
      endpoint = `/project/restore`;
    }

    this.http.post<any>(this.myService.getApiHost() + endpoint, {
      [this.type + '_id']: item, // Dynamic key based on item type
      restore: true
    }).subscribe(response => {
      this.toastr.success('Item restored successfully!');
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.router.url]);
    });
  }
}
