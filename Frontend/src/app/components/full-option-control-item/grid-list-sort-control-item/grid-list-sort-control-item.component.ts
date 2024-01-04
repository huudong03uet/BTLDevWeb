import { Component } from '@angular/core';
import { FullOptionControlItemService } from 'src/app/services/full-option-control-item.service';

@Component({
  selector: 'app-grid-list-sort-control-item',
  templateUrl: './grid-list-sort-control-item.component.html',
  styleUrls: ['./grid-list-sort-control-item.component.scss']
})
export class GridListSortControlItemComponent {
  sortBy: string = '';
  sortDirection: string = '';
  constructor(private fullOptionControlItemService: FullOptionControlItemService) {
  }
  changeSortBy(event: Event) {
    this.sortBy = (event.target as HTMLInputElement).value;
    this.fullOptionControlItemService.changeMessageSortBy(this.sortBy);
  }

  changeSortDirection(s: string) {
    this.sortDirection = (s);
    this.fullOptionControlItemService.changeMessageSortDirection(this.sortDirection);
  }

}
