import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';
import { HostService } from 'src/app/host.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss', '../../style-settings.scss']
})
export class ProfileSettingsComponent implements OnInit {
  userData: any = {};
  maxBioCharacterLimit = 100;
  bioCharacterCount = 0;

  constructor(private myService: HostService,private userDataService: UserDataService, private toastr: ToastrService,

    ) {
      this.toastr.toastrConfig.positionClass = 'toast-top-center'; // Set toastr position
    }

  ngOnInit(): void {
    const user_id = this.userDataService.getUserData()?.user_id;
    if (user_id) {
      this.userDataService.getUserInfoFromBackend(user_id)
        .then((user: any) => {
          this.userData = user;
          this.updateBioCharacterCount();
        })
        .catch(error => {
          this.toastr.error('Error fetching user information:', error);
        });
    }
  }

  updateBioCharacterCount() {
    this.bioCharacterCount = this.userData.bio ? this.userData.bio.length : 0;
  }

  getBioPlaceholder(): string {
    const remainingCharacters = this.maxBioCharacterLimit - this.bioCharacterCount;
    return remainingCharacters >= 0
      ? `Bio (${remainingCharacters} characters remaining)`
      : `Bio (Exceeded limit by ${Math.abs(remainingCharacters)} characters)`;
  }

  updateProfile() {
    const user_id = this.userData.user_id;
    const profileData = {
      full_name: this.userData.full_name,
      location: this.userData.location,
      bio: this.userData.bio,
    };


    axios.put(this.myService.getApiHost() + `/user/updateProfile/${user_id}`, profileData).then(response => {
      this.toastr.success('Profile updated successfully!');
      }).catch(error => {
        this.toastr.error('Error updating profile:', error);
      });


  }

  organizeShowcase() {
    // Call the function to handle showcase organization in the service
  }
}
