// create-new-collection.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios, { AxiosError } from 'axios';

@Component({
  selector: 'app-create-new-collection',
  templateUrl: './create-new-collection.component.html',
  styleUrls: ['./create-new-collection.component.scss', '../../pages/settings/style-settings.scss']
})
export class CreateNewCollectionComponent {
  @Output() close = new EventEmitter<void>();

  createForm: FormGroup;
  maxCharacterLimit = 1000;

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      collectionTitle: ['', [Validators.required, Validators.maxLength(this.maxCharacterLimit)]],
      collectionDescription: ['', [Validators.maxLength(this.maxCharacterLimit)]],
    });
  }

  onCloseCreateNewCollection() {
    this.close.emit();
  }

  async onSubmit() {
    if (this.createForm.valid) {
      try {
        const response = await axios.post('http://localhost:3000/your-work/collections', {
          name: this.createForm.value.collectionTitle,
          // Add other fields if needed
        });

        console.log('Collection created successfully:', response.data.collection);

        // Reset the form fields
        this.createForm.reset();

        // Close the form
        this.onCloseCreateNewCollection();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // Log the entire error object for further investigation
          console.error('Error creating collection:', error);

          // Check if 'error' property exists on the response data
          const errorMessage = (error as AxiosError<{ error?: string }>).response?.data?.error;
          console.error('Error message:', errorMessage || 'Unknown error');
        } else {
          console.error('Error creating collection:', error);
        }
      }
    }
  }
}
