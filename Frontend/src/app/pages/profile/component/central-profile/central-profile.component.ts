import { Component, ViewEncapsulation } from '@angular/core';
import { Params, Router } from '@angular/router';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-central-profile',
  templateUrl: './central-profile.component.html',
  styleUrls: ['./central-profile.component.scss']
})
export class CentralProfileComponent {
  showPens = true;
  showCollections = false;
  showProjects = false;
  // constructor(
  //   private route: ActivatedRoute
  // ) {}
  currentURL = "";
  // constructor(private router: Router) {}
  constructor(
    private router: Router,
    private myService: HostService,
    ) {
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

  navigateToProjects() {
    this.router.navigate(['/profile/projects']);
  }

  
  
  
  addClassActive() {
    const links = document.querySelectorAll('.links-centrals');
    links.forEach(link => {
      const span = document.createElement('span');

      // <a class="link-settings account">Account</a>
      //  currentURL = this.myService.getWebHost() + /settings/account
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
