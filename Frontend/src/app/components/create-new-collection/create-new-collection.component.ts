import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios, { AxiosError } from 'axios';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';
import { HostService } from 'src/app/host.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-new-collection',
  templateUrl: './create-new-collection.component.html',
  styleUrls: ['./create-new-collection.component.scss', '../../pages/settings/style-settings.scss']
})
export class CreateNewCollectionComponent {
  @Output() close = new EventEmitter<void>();

  createForm: FormGroup;
  maxCharacterLimit = 1000;

  constructor(
    private fb: FormBuilder, 
    private userData: UserDataService,
    private myService: HostService,
    private router: Router,
    private toastr: ToastrService,
  ) 
  {
    this.createForm = this.fb.group({
      collectionTitle: ['', [Validators.required, Validators.maxLength(this.maxCharacterLimit)]],
      collectionDescription: ['', [Validators.maxLength(this.maxCharacterLimit)]],
      isPublic: [true], // Default to public
    });
    this.toastr.toastrConfig.positionClass = 'toast-top-center'; // Set toastr position
  }

  onCloseCreateNewCollection() {
    this.close.emit();
  }

  async onSubmit() {
    if (this.createForm.valid) {
      try {
        const user = this.userData.getUserData();
        const userId = user?.user_id;

        if (!userId) {
          this.toastr.error('User ID not available.');
          return;
        }

        const collectionTitle = this.createForm.value.collectionTitle;

        if (!collectionTitle) {
          this.toastr.error('Collection Title cannot be null or empty.');
          return;
        }

        const response = await axios.post(this.myService.getApiHost() + `/your-work/collections/`, {
          name: collectionTitle,
          user_id: userId,
          isPublic: this.createForm.value.isPublic,
        });

        this.toastr.success('Collection created successfully:');

        this.createForm.reset();
        this.onCloseCreateNewCollection();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error('Error creating collection:', error);
          const errorMessage = (error as AxiosError<{ error?: string }>).response?.data?.error;
          this.toastr.error('Error message:', errorMessage || 'Unknown error');
        } else {
          console.error('Error creating collection:', error);
        }
      }
    }
  }
}
