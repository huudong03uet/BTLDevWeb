import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';
import axios from 'axios';

import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-pinned-collection',
  templateUrl: './pinned-collection.component.html',
  styleUrls: ['./pinned-collection.component.scss', '../../pages/settings/style-settings.scss'],
})
export class PinnedCollectionComponent implements OnInit {

  data: any;
  pen_ids = [];
  collection_ids = [{
    "collection_id": 1,
  },
    {
      "collection_id": 2,
    }
];
  pen_collection_ids: { id: any, type: string }[] = [];

  constructor(
    private router: Router,
    private userData: UserDataService,
    private myService: HostService,
  ) {}


  ngOnInit(): void {
    // console.log(13221)
    if(this.userData.getUserData() === null) {
      this.router.navigate(['/login']);
    } else {
      const url = this.myService.getApiHost() + `/pin/getPinnedUser/${this.userData.getUserData()?.user_id}`;
      // console.log(url)
      axios.get(url)
      .then(response => {
        // Xử lý dữ liệu trả về từ API
        // console.log(123);
        this.data = response.data.pins;
        // console.log(this.data, 12341341)

        this.updatePenIds();

      })
      .catch(error => {
        // Xử lý lỗi nếu có
        console.error('Error fetching pinned user data:', error);
      });    
    }
  }

  @Output() closePinned = new EventEmitter<void>();

  onClosePinnedCollection() {
    this.closePinned.emit();
  }


  updatePenIds() {
    this.pen_ids = this.data.filter((item: { type: any; }) => item.type === 'pen').map((item: { pen_id: any; }) => item.pen_id);
    // console.log(this.pen_ids)
    // for add {id: 1, type: 'pen'} to pen_collection

    for (let i = 0; i < this.pen_ids.length; i++) {
      this.pen_collection_ids.push({id: this.pen_ids[i], type: 'pen'});
    }

    // console.log(this.pen_collection_ids)
    for (let i = 0; i < this.collection_ids.length; i++) {
      this.pen_collection_ids.push({id: this.collection_ids[i], type: 'collection'});
    }

    // shuffle array
    this.pen_collection_ids.sort(() => Math.random() - 0.5);
    console.log("1234", this.pen_collection_ids)

  
  
  }



}
