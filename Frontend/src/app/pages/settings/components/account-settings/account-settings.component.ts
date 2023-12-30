import { Component } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss', '../../style-settings.scss']
})
export class AccountSettingsComponent {
  newUsername: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  newEmail: string = '';

  constructor(private userDataService: UserDataService, private router: Router) { }

  changeUsername() {
    const user_id = this.getUserID();
    if (user_id && this.newUsername.trim() !== '') {
      this.userDataService.updateUsername(user_id, this.newUsername.trim())
        .then(response => {
          console.log('Username updated successfully:', response);
          alert('Username updated successfully!');
          this.userDataService.setUserDataUsername(this.newUsername.trim());
        })
        .catch(error => {
          console.error('Error updating username:', error);
          alert('Error updating username!');
        });
    } else {
      alert('Username is empty!!');
    }
  }

  updatePassword() {
    const user_id = this.getUserID();
    if (user_id && this.currentPassword.trim() !== '' && this.newPassword.trim() !== '') {
      this.userDataService.updatePassword(user_id, this.currentPassword.trim(), this.newPassword.trim())
        .then(response => {
          console.log('Password updated successfully:', response);
          alert('Password updated successfully!');
        })
        .catch(error => {
          console.error('Error updating password:', error);
          alert('Error updating password!');
        });
    } else {
      alert('Password is empty!!');
    }
  }

  changeEmail() {
    const user_id = this.getUserID();
    if (user_id && this.newEmail.trim() !== '') {
      this.userDataService.updateEmail(user_id, this.newEmail.trim())
        .then(response => {
          console.log('Email updated successfully:', response);
          alert('Email updated successfully');
        })
        .catch(error => {
          console.error('Error updating email:', error);
          alert('Error updating email');
        });
    } else {
      alert('Email is empty!!');
    }
  }

  deleteAccount() {
    const user_id = this.getUserID();
    if (user_id) {
      if (confirm('Are you sure you want to delete your account? This action is irreversible.')) {
        // Call your service method to delete the account and handle the response
        this.userDataService.deleteAccount(user_id)
          .then(response => {
            console.log('Account deleted successfully:', response);
            alert('Tài khoản đã được xóa khỏi CODE!');
            this.router.navigate(['/login']);
          })
          .catch(error => {
            console.error('Error deleting account:', error);
            // Handle errors and display an error message if necessary
          });
      }
    }
  }


  private getUserID(): number | null {
    const userData = this.userDataService.getUserData();
    return userData ? userData.user_id : null;
  }
}
