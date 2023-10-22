import { Component, EventEmitter, Input, Output } from '@angular/core';
// template: `
// <create-new-collection [hiddenCreateNewCollection]="hiddenCreateNewCollection" (closeCreateNewCollection)="closeCreateNewCollection()"></create-new-collection>
// `
// hiddenCreateNewCollection: boolean = true;
// openCreateNewCollection() {
// this.hiddenCreateNewCollection = false;
// }

// closeCreateNewCollection() {
// this.hiddenCreateNewCollection = true;


// <button type="button" class="btn-close-new-collection" (click)="closeCreateNewCollection()">
@Component({
  selector: 'app-create-new-collection',
  templateUrl: './create-new-collection.component.html',
  styleUrls: ['./create-new-collection.component.scss', '../../pages/settings/style-settings.scss'],
  template: `
        <button type="button" class="btn-close-new-collection" (click)="onCloseCreateNewCollection()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M96.8 83.7 63.1 50l33.7-33.7c3.6-3.6 3.6-9.4 0-13.1s-9.5-3.6-13.1 0L50 36.9 16.3 3.2C12.7-.4 6.9-.4 3.2 3.2s-3.6 9.5 0 13.1L36.9 50 3.2 83.7c-3.6 3.6-3.6 9.4 0 13.1s9.5 3.6 13.1 0L50 63.1l33.7 33.7c3.6 3.6 9.4 3.6 13.1 0s3.6-9.5 0-13.1z"></path></svg>
        </button>
  `
})
export class CreateNewCollectionComponent {

  @Output() close = new EventEmitter<void>();

  
  onCloseCreateNewCollection() {
    this.close.emit();
  }

  



}
