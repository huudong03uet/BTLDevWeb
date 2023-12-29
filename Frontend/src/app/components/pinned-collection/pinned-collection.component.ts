import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';
import axios from 'axios';


@Component({
  selector: 'app-pinned-collection',
  templateUrl: './pinned-collection.component.html',
  styleUrls: ['./pinned-collection.component.scss', '../../pages/settings/style-settings.scss'],
})
export class PinnedCollectionComponent implements OnInit {

  data: any;
  pen_ids = [];


  constructor(
    private router: Router,
    private userData: UserDataService
  ) {}


  ngOnInit(): void {
    console.log(13221)
    if(this.userData.getUserData() === null) {
      this.router.navigate(['/login']);
    } else {
      const url = `http://localhost:3000/pin/getPinnedUser/${this.userData.getUserData()?.user_id}`;
      console.log(url)
      axios.get(url)
      .then(response => {
        // Xử lý dữ liệu trả về từ API
        console.log(123);
        this.data = response.data.pins;
        console.log(this.data, 12341341)

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
    console.log(this.pen_ids)
  }



}
