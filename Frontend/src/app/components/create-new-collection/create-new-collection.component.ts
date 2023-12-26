import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  onSubmit() {
    if (this.createForm.valid) {
      // Implement your logic to create a new collection
      console.log('Title:', this.createForm.value.collectionTitle);
      console.log('Description:', this.createForm.value.collectionDescription);

      // Optionally, you can reset the form fields
      this.createForm.reset();

      // Close the form
      this.onCloseCreateNewCollection();
    }
  }
}
