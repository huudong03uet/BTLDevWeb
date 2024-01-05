import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { HostService } from 'src/app/host.service';

import axios from 'axios';
import { CreateNewCollectionServiceService } from 'src/app/services/create-new-collection-service.service';

@Component({
  selector: 'app-list-collection-to-add-pen',
  templateUrl: './list-collection-to-add-pen.component.html',
  styleUrls: ['./list-collection-to-add-pen.component.scss'],

})
export class ListCollectionToAddPenComponent implements OnInit {

  @Input() currentCollectionID: any;

  @Input() pen_id: any;
  collection_ids: any[] = [];
  data_views: any[] = [];
  pen_name: string = ""; 

  constructor(
    private http: HttpClient,
    private userData: UserDataService,
    private router: Router,
    private myService: HostService,
    private toastr: ToastrService,
    
  ) {
    this.toastr.toastrConfig.positionClass = 'toast-top-center'; // Set toastr position
  }


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

      for (let i = 0; i < collections.length; i++) {
        const collectionId = collections[i].collection_id;
        const pensInCollection = await this.getPensInCollection(collectionId);
        const penIds = pensInCollection.pen_ids;

        collections[i].collection_number_pens = penIds.length;
        if (!this.currentCollectionID) {
          collections[i].has_this_pen = penIds.includes(this.pen_id);
        }
        collections[i].collection_name = pensInCollection.collectionName;
      }
      if (!this.currentCollectionID) {
        this.pen_name = await this.getPenName(this.pen_id);
      }
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
        this.toastr.success('Pen added to collection successfully!', 'Success');
        // Reload the current route to reflect the changes
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      } else {
        this.toastr.error('Error adding pen to collection: ' + response.data.error, 'Error');
      }
    } catch (error) {
      this.toastr.error('Error adding pen to collection: ' + error, 'Error');
    }
  }

  async removePenFromCollection(collection_id: number) {
    try {
      const apiUrl = this.myService.getApiHost() + `/your-work/collections/removePenFromCollection`;
      const response = await axios.post(apiUrl, { collection_id, pen_id: this.pen_id });

      if (response.data.code === 200) {
        this.toastr.success('Pen removed from collection successfully!', 'Success');
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      } else {
        this.toastr.success('Pen removed from collection successfully!', 'Success');
      }
    } catch (error) {
      this.toastr.success('Pen removed from collection successfully!', 'Success');
    }
  }

  viewCollection(collection_id: number) {
    this.router.navigate([`/collection/${collection_id}`]);
  }

  async addCollectionToCollection(targetCollectionId: number) {
    try {
      const apiUrl = this.myService.getApiHost() + `/your-work/collections/addCollectionToCollection`;
      const response = await axios.post(apiUrl, { sourceCollectionId: this.currentCollectionID, targetCollectionId });
      if (response.data.code === 200) {
        this.toastr.success('Collection added to collection successfully!', 'Success');
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      } else {
        this.toastr.error('Error adding collection to collection: ' + response.data.error, 'Error');
      }
    } catch (error) {
      this.toastr.error('Error adding collection to collection: ' + error, 'Error');
    }
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
