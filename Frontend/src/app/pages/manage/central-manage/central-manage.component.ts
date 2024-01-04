import { Component, ViewEncapsulation } from '@angular/core';
import { Params, Router } from '@angular/router';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-central-manage',
  templateUrl: './central-manage.component.html',
  styleUrls: ['./central-manage.component.scss']
})
export class CentralManageComponent {
  showActive = true;
  showDeleted = false;
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
    this.router.navigate(['/manage/active']);
  }

  navigateToCollections() {
    this.router.navigate(['/manage/deleted']);
  }

  
  
  
  addClassActive() {
    const links = document.querySelectorAll('.links-centrals');
    links.forEach(link => {
      const span = document.createElement('span');

      // <a class="link-settings account">Account</a>
      //  currentURL = this.myService.getWebHost() + /settings/account
      var check_currentURL = this.currentURL.split('/')[4]
      if (link.classList.contains(check_currentURL)) {
        link.classList.add('actived');
        span.classList.add('actived');
        link.appendChild(span);
      } else {
        link.classList.remove('actived');
        //  remove span
        const spanToRemove = link.querySelector('span');
        if (spanToRemove !== null) {
          link.removeChild(spanToRemove);
        }
      }
    });
  }
}