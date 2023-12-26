import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item-grid-code',
  templateUrl: './list-item-grid-code.component.html',
  styleUrls: ['./list-item-grid-code.component.scss']
})
export class ListItemGridCodeComponent {
  // parent -> child: pen_ids

  @Input() pen_ids: any;
}
