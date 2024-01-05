import { Component, Input } from '@angular/core';
import { FullOptionControlItemService } from 'src/app/services/full-option-control-item.service';

@Component({
  selector: 'app-search-view-control-item',
  templateUrl: './search-view-control-item.component.html',
  styleUrls: ['./search-view-control-item.component.scss']
})
export class SearchViewControlItemComponent {
  @Input() type: string = '';
  publicPrivate: string = '';
  search: string = '';
  // sortDirection: string = '';
  // constructor(private fullOptionControlItemService: FullOptionControlItemService) {
  // }
  // changeSortBy(event: Event) {
  //   this.sortBy = (event.target as HTMLInputElement).value;
  //   this.fullOptionControlItemService.changeMessageSortBy(this.sortBy);
  // }

  // changeSortDirection(s: string) {
  //   this.sortDirection = (s);
  //   this.fullOptionControlItemService.changeMessageSortDirection(this.sortDirection);
  // }
  constructor(private fullOptionControlItemService: FullOptionControlItemService) {
  }

  changeSelectPublicPrivate(event: Event) {
    this.publicPrivate = (event.target as HTMLInputElement).value;
    this.fullOptionControlItemService.changeMessageSelectPublicPrivate(this.publicPrivate);
  }
  changeSearch(){
    this.fullOptionControlItemService.changeMessageSearchFor(this.search);
  }
}
