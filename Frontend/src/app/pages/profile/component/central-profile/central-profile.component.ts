import { Component, ViewEncapsulation } from '@angular/core';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-central-profile',
  templateUrl: './central-profile.component.html',
  styleUrls: ['./central-profile.component.scss']
})
export class CentralProfileComponent {
  showPens = true;
  showCollections = false;
  // constructor(
  //   private route: ActivatedRoute
  // ) {}
  currentURL = "";
  // constructor(private router: Router) {}
  constructor(private router: Router) {
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
  
  navigateToPens() {
    // console.log('profile')
    this.router.navigate(['/profile/pens']);
  }

  navigateToCollections() {
    this.router.navigate(['/profile/collections']);
  }

  
  
  
  addClassActive() {
    const links = document.querySelectorAll('.links-centrals');
    links.forEach(link => {
      const span = document.createElement('span');

      // <a class="link-settings account">Account</a>
      //  currentURL = http://localhost:4200/settings/account
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
}