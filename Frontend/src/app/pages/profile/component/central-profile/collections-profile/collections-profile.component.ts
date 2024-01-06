import { Component } from '@angular/core';
import { Params, Router } from '@angular/router';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-collections-profile',
  templateUrl: './collections-profile.component.html',
  styleUrls: ['./collections-profile.component.scss']
})
export class CollectionsProfileComponent {
  showLovedC = false;
  showPrivateC = false;
  showPublicC = false;
  showPopularC = true;
  currentURL = "";
  // constructor(private router: Router) {}
  constructor(private myService: HostService, private router: Router) {
    //  print when route changes 
    // this.ngAfterViewChecked();
  }
  userData: any;

  //  ng after change partial page
  ngAfterViewChecked() {
    if (this.currentURL != window.location.href) {
      this.currentURL = window.location.href;

      this.addClassActive();
    }
  }
  navigateToCPopular() {
    this.router.navigate(['/profile/collections/popular']);
  }
  navigateToCPrivate() {
    this.router.navigate(['/profile/collections/private']);
  }
  navigateToCPublic() {
    this.router.navigate(['/profile/collections/public']);
  }
  navigateToCLoved() {
    this.router.navigate(['/profile/collections/loved']);
  }
  addClassActive() {
    const links = document.querySelectorAll('.links-collections');
    links.forEach(link => {
      const span = document.createElement('span');

      // <a class="link-settings account">Account</a>
      //  currentURL = this.myService.getWebHost() + /settings/account
      var check_currentURL = this.currentURL.split('/')[5] + "C"
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
}
