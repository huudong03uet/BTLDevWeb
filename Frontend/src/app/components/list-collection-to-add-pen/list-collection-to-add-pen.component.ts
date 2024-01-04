import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HostService } from 'src/app/host.service';

import axios from 'axios';
import { CreateNewCollectionServiceService } from 'src/app/services/create-new-collection-service.service';

@Component({
  selector: 'app-list-collection-to-add-pen',
  templateUrl: './list-collection-to-add-pen.component.html',
  styleUrls: ['./list-collection-to-add-pen.component.scss'],

})
export class ListCollectionToAddPenComponent implements OnInit {

  @Input() pen_ids_in_collection: any[] = [];
  @Input() type: string = "pen";

  @Input() pen_id: any = 1;
  collection_ids: any[] = [];
  data_views: any[] = [];
  pen_name: string = ""; // Thêm biến để lưu trữ pen_name

  constructor(
    private http: HttpClient,
    private userData: UserDataService,
    private router: Router,
    private myService: HostService,
  ) { }

  async getPenName(penId: number): Promise<string> {
    try {
      const apiUrl = this.myService.getApiHost() + `/pen/getPenById`;
      const response = await axios.post(apiUrl, { pen_id: penId });
      return response.data.pen.name;
    } catch (error) {
      console.error('Error fetching pen name:', error);
      throw error;
    }
  }

  async getPensInCollection(collectionId: number): Promise<any> {
    try {
      const apiUrl = this.myService.getApiHost() + `/your-work/collections/${collectionId}/pens`;
      const response = await axios.get(apiUrl);
      return response.data; // Assume the response structure includes collection_name
    } catch (error) {
      console.error('Error fetching pens in collection:', error);
      throw error;
    }
  }

  async ngOnInit(): Promise<void> {
    const user = this.userData.getUserData();
    if (!user) {
      return;
    }

    const userId = user.user_id;
    let apiUrl = this.myService.getApiHost() + `/your-work/collections/user/${userId}`;

    try {
      const response = await axios.get(apiUrl);
      let collections = response.data.collections;

      // Lặp qua từng collection để lấy danh sách pen và cập nhật giá trị
      for (let i = 0; i < collections.length; i++) {
        const collectionId = collections[i].collection_id;
        const pensInCollection = await this.getPensInCollection(collectionId);
        const penIds = pensInCollection.pen_ids;

        // Cập nhật giá trị collection_number_pens và has_this_pen
        collections[i].collection_number_pens = penIds.length;
        collections[i].has_this_pen = penIds.includes(this.pen_id);

        // Assuming the response structure includes collection_name
        collections[i].collection_name = pensInCollection.collectionName;
        // console.log(collections[i].collection_name);
      }

      // Lấy tên của pen
      this.pen_name = await this.getPenName(this.pen_id);

      this.data_views = collections;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async addPenToCollection(collection_id: number) {
    try {
      const apiUrl = this.myService.getApiHost() + `/your-work/collections/addPenToCollection`;
      const response = await axios.post(apiUrl, { collection_id, pen_id: this.pen_id });

      // Check the response and perform any additional actions if needed
      if (response.data.code === 200) {
        console.log('Pen added to collection successfully.');
        alert('Pen added to collection successfully!');
        // Reload the current route to reflect the changes
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      } else {
        console.error('Error adding pen to collection:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding pen to collection:', error);
    }
  }

  async removePenFromCollection(collection_id: number) {
    try {
      const apiUrl = this.myService.getApiHost() + `/your-work/collections/removePenFromCollection`;
      const response = await axios.post(apiUrl, { collection_id, pen_id: this.pen_id });

      if (response.data.code === 200) {
        console.log('Pen removed from collection successfully.');
        alert('Pen removed from collection successfully!');
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      } else {
        console.error('Error removing pen from collection:', response.data.error);
      }
    } catch (error) {
      console.error('Error removing pen from collection:', error);
    }
  }

  viewCollection(collection_id: number) {
    this.router.navigate([`/collection/${collection_id}`]);
  }


  search: string = "";

  searchFiles(searchValue: string) {
    this.search = searchValue;
    if (searchValue == "") {
      this.data_views = this.collection_ids;
    } else {
      this.data_views = [];
      for (let i = 0; i < this.collection_ids.length; i++) {
        if (this.collection_ids[i].collection_name.toLowerCase().includes(searchValue.toLowerCase())) {
          this.data_views.push(this.collection_ids[i]);
        }
      }
    }
  }
  childVisible: boolean = false;

  openCreateNewCollection() {
    this.childVisible = true;

    // this.createNewCollectionService.appendComponentToBody();

  }

  handleChildClose() {
    this.childVisible = false;
  }

}
