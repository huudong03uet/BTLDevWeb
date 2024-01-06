import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios, { AxiosError } from 'axios';
import { UserDataService } from 'src/app/services/user-data.service';
import { HostService } from 'src/app/host.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.scss', '../../pages/settings/style-settings.scss']
})
export class CreateNewProjectComponent {
  @Output() closeProject = new EventEmitter<void>();

  createForm: FormGroup;
  maxCharacterLimit = 1000;

  constructor(
    private fb: FormBuilder, 
    private userData: UserDataService,
    private myService: HostService,
    private router: Router
  ) 
  {
    this.createForm = this.fb.group({
      projectTitle: ['', [Validators.required, Validators.maxLength(this.maxCharacterLimit)]],
      projectDescription: ['', [Validators.maxLength(this.maxCharacterLimit)]],
    });
  }

  onCloseCreateNewProject() {
    this.closeProject.emit();
  }

  async onSubmit() {
    if (this.createForm.valid) {
      const apiUrl = this.myService.getApiHost() + '/project/createProjectSample';
      const requestBody = {
        user_id: this.userData.getUserData()?.user_id,
        project_name: this.createForm.value.projectTitle,
        project_description: this.createForm.value.projectDescription,


      };
      try {
        const response = await axios.post(apiUrl, requestBody);
        console.log('Response:', response.data);
        //  link to the project page : /project/:project_id


        this.closeProject.emit();
        this.router.navigate([`/project/${response.data.project_id}`]);


        
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Error:', axiosError.response?.data);
      }
    }
    
  }
}