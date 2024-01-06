import { Component } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private userDataService: UserDataService, private router: Router, private toastr: ToastrService,

  ) {
    this.toastr.toastrConfig.positionClass = 'toast-top-center'; // Set toastr position
  }

  changeUsername() {
    const user_id = this.getUserID();
    if (user_id && this.newUsername.trim() !== '') {
      this.userDataService.updateUsername(user_id, this.newUsername.trim())
        .then(response => {
          this.toastr.success('Username updated successfully!');
          this.userDataService.setUserDataUsername(this.newUsername.trim());
        })
        .catch(error => {
          this.toastr.error('Error updating username:', error);
        });
    } else {
      this.toastr.error('Username is empty!!');
    }
  }

  updatePassword() {
    const user_id = this.getUserID();
    if (user_id && this.currentPassword.trim() !== '' && this.newPassword.trim() !== '') {
      this.userDataService.updatePassword(user_id, this.currentPassword.trim(), this.newPassword.trim())
        .then(response => {
          this.toastr.success('Password updated successfully!');
        })
        .catch(error => {
          this.toastr.error('Error updating password:', error);
        });
    } else {
      this.toastr.error('Password is empty!!');
    }
  }

  changeEmail() {
    const user_id = this.getUserID();
    if (user_id && this.newEmail.trim() !== '') {
      this.userDataService.updateEmail(user_id, this.newEmail.trim())
        .then(response => {
          this.toastr.success('Email updated successfully');
        })
        .catch(error => {
          this.toastr.error('Error updating email:', error);
        });
    } else {
      this.toastr.error('Email is empty!!');
    }
  }

  deleteAccount() {
    const user_id = this.getUserID();
    if (user_id) {
      if (confirm('Are you sure you want to delete your account? This action is irreversible.')) {
        this.userDataService.deleteAccount(user_id)
          .then(response => {
            this.toastr.success('Account has been removed from CODE!');
            this.router.navigate(['/login']);
          })
          .catch(error => {
            this.toastr.error('Error deleting account:', error);
          });
      }
    }
  }


  private getUserID(): number | null {
    const userData = this.userDataService.getUserData();
    return userData ? userData.user_id : null;
  }
}
