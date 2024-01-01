import { Component, ViewEncapsulation } from '@angular/core';
import { Params, Router } from '@angular/router';
import { HostService } from 'src/app/host.service';
@Component({
  selector: 'app-pen-profile',
  templateUrl: './pen-profile.component.html',
  styleUrls: ['./pen-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PenProfileComponent {
  showLoved = false;
  showPrivate = false;
  showPublic = false;
  showPopular = true;
  currentURL = "";
  // constructor(private router: Router) {}
  constructor(private router: Router, private myService: HostService,) {
    //  print when route changes 
    // this.ngAfterViewChecked();
  }
  userData: any;

  //  ng after change partial page
  ngAfterViewChecked() {
    // console.log('ngAfterViewChecked')
    if (this.currentURL != window.location.href) {
      this.currentURL = window.location.href;

      this.addClassActive();
    }
  }
  // navigateToShowcase() {
  //   this.router.navigate(['/profile/pens/showcase']);
  // }

  navigateToPopular() {
    this.router.navigate(['/profile/pens/popular']);
  }
  navigateToPublic() {
    this.router.navigate(['/profile/pens/public']);
  }
  navigateToPrivate() {
    this.router.navigate(['/profile/pens/private']);
  }

  // navigateToTemplate() {
  //   this.router.navigate(['/profile/pens/template']);
  // }

  // navigateToForked() {
  //   this.router.navigate(['/profile/pens/forked']);
  // }
  navigateToLoved() { 
    this.router.navigate(['/profile/pens/loved']);
  }
  // navigateToTags() {
  //   this.router.navigate(['/profile/pens/tags']);
  // }
  addClassActive() {
    const links = document.querySelectorAll('.links-pens');
    links.forEach(link => {
      const span = document.createElement('span');

      // <a class="link-settings account">Account</a>
      //  currentURL = this.myService.getWebHost() + /settings/account
      var check_currentURL = this.currentURL.split('/')[5]
      if (link.classList.contains(check_currentURL)) {
        // console.log('check_currentURLTrue', check_currentURL)
        link.classList.add('active');
        span.classList.add('active');
        link.appendChild(span);
      } else {
        // console.log('check_currentURLFalse', check_currentURL)
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
