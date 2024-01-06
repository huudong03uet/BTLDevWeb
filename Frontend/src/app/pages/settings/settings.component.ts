import { Component, OnChanges, ViewEncapsulation } from '@angular/core';
import { Params, Router } from '@angular/router';
import { HostService } from 'src/app/host.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent {
  currentURL = "";
  // constructor(private router: Router) {}
  constructor(private myService: HostService,private router: Router) {
    //  print when route changes 
    // this.ngAfterViewChecked();
  }


  //  ng after change partial page
  ngAfterViewChecked() {
    if (this.currentURL != window.location.href) {
      this.currentURL = window.location.href;

      this.addClassActive();
    }
  }
  
  
  

  navigateToProfile() {
    this.router.navigate(['/settings/profile']);
  }

  navigateToAccount() {
    this.router.navigate(['/settings/account']);
  }

  navigateToBilling() {
    this.router.navigate(['/settings/billing']);
  }

  navigateToNotifications() {
    this.router.navigate(['/settings/notifications']);
  }

  navigateToPrivacy() {
    this.router.navigate(['/settings/privacy']);
  }

  navigateToEditorPreferences() {
    this.router.navigate(['/settings/editor-preferences']);
  }

  navigateToContentPreferences() {
    this.router.navigate(['/settings/content-preferences']);
  }


  
  addClassActive() {
    const links = document.querySelectorAll('.link-settings');
    links.forEach(link => {
      const span = document.createElement('span');

      // <a class="link-settings account">Account</a>
      //  currentURL = this.myService.getWebHost() +  /settings/account
      var check_currentURL = this.currentURL.split('/')[4]
      if (link.classList.contains(check_currentURL)) {
        link.classList.add('active');

        span.classList.add('active');
        link.appendChild(span);
      } else {
        link.classList.remove('active');
        //  remove span
        const spanToRemove = link.querySelector('span');
        if (spanToRemove !== null) {
          link.removeChild(spanToRemove);
        }
      }
    });
  }

  // OnChanges() {
  //   console.log('onchanges')
  //   this.addClassActive();
  // }
}
