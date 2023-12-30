import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss', '../../style-settings.scss']
})
export class ProfileSettingsComponent implements OnInit {
  userData: any = {};
  maxBioCharacterLimit = 100;
  bioCharacterCount = 0;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    // Load user data on component initialization
    const user_id = this.userDataService.getUserData()?.user_id;
    if (user_id) {
      this.userDataService.getUserInfoFromBackend(user_id)
        .then((user: any) => {
          this.userData = user;
          this.updateBioCharacterCount();
        })
        .catch(error => {
          console.error('Error fetching user information:', error);
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
      // Add other profile fields based on your backend model
    };

    // console.log(profileData);

    axios.put(`http://localhost:3000/user/updateProfile/${user_id}`, profileData)
      .then(response => {
        console.log('Profile updated successfully:', response.data);
        // Handle success, e.g., show a success message
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        // Handle error, e.g., show an error message
      });

    // Call the updateProfile function from the service
    // this.userDataService.updateProfile(user_id, profileData)
    //   .then((updatedUser: any) => {
    //     // Handle successful profile update
    //     console.log('Profile updated successfully:', updatedUser);
    //   })
    //   .catch(error => {
    //     console.error('Error updating user profile:', error);
    //     // Handle error
    //   });
  }

  organizeShowcase() {
    // Call the function to handle showcase organization in the service
  }
}
