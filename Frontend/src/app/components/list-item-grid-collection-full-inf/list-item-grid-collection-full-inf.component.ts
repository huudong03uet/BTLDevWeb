import { Component, Input } from '@angular/core';


interface Collection {
  collection_id: number;
  name: string;
  status: string;
  user_id: number;
  // Add other properties if needed
}
@Component({
  selector: 'app-list-item-grid-collection-full-inf',
  templateUrl: './list-item-grid-collection-full-inf.component.html',
  styleUrls: ['./list-item-grid-collection-full-inf.component.scss']
})
export class ListItemGridCollectionFullInfComponent {
  @Input() collections: any[] = [];

  collection_ids_current: any[] = [];
  page_now = 1;
  is_end = false;
  is_start = true;

  ngOnChanges() {
    this.updateCollectionData();
  }


  private updateCollectionData(): void {
    const startIndex = (this.page_now - 1) * 6;
    const endIndex = this.page_now * 6;
    
    const validEndIndex = Math.min(endIndex, this.collections.length);
    
    this.collection_ids_current = this.collections.slice(startIndex, validEndIndex);
    console.log("error eorro", this.collection_ids_current)
    //  = collectionsForCurrentPage;
    // console.log("error eorro", this.collections)
    this.check_is_start_end();
  }
  
  clickNextPageButton(): void {
    this.page_now += 1;
    this.updateCollectionData();
  }

  clickPrevPageButton(): void {
    this.page_now -= 1;
    this.updateCollectionData();
  }

  private check_is_start_end(): void {
    this.is_start = this.page_now === 1;
    this.is_end = this.page_now * 6 >= this.collections.length;
  }
}
