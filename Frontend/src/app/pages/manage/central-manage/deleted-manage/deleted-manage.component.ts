import { Component, ViewEncapsulation } from '@angular/core';
import { Params, Router } from '@angular/router';
import { HostService } from 'src/app/host.service';
@Component({
  selector: 'app-deleted-manage',
  templateUrl: './deleted-manage.component.html',
  styleUrls: ['./deleted-manage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DeletedManageComponent {

  showUser = true;
  showPen = false;
  showCollection = false;
  showProject = false;
  showComment = false;
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

  navigateToUsers() {
    this.router.navigate(['/manage/deleted/users']);
  }
  navigateToPens() {
    this.router.navigate(['/manage/deleted/pens']);
  }
  navigateToCollections() {
    this.router.navigate(['/manage/deleted/collections']);
  }

  navigateToProjects() {
    this.router.navigate(['/manage/deleted/projects']);
  }

  navigateToComments() {
    this.router.navigate(['/manage/deleted/comments']);
  }

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
