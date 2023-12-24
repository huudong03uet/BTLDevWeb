import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pinned-collection',
  templateUrl: './pinned-collection.component.html',
  styleUrls: ['./pinned-collection.component.scss', '../../pages/settings/style-settings.scss'],
})
export class PinnedCollectionComponent {

  @Output() closePinned = new EventEmitter<void>();

  onClosePinnedCollection() {
    this.closePinned.emit();
  }

  pen_ids = [1, 2, 3, 3, 2, 1,  2];

}
