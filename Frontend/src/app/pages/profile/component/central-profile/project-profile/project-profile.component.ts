import { Component } from '@angular/core';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.scss']
})
export class ProjectProfileComponent {
  showLovedProject = false;
  showPrivateProject = false;
  showPublicProject = false;
  showPopularProject = true;
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
  navigateToProjectPopular() {
    this.router.navigate(['/profile/projects/popular']);
  }
  navigateToProjectPrivate() {
    // console.log('private')
    this.router.navigate(['/profile/projects/private']);
  }
  navigateToProjectPublic(){
    this.router.navigate(['/profile/projects/public']);
  }
  navigateToProjectLoved(){
    this.router.navigate(['/profile/projects/loved']);
  }
  addClassActive() {
    const links = document.querySelectorAll('.links-projects');
    links.forEach(link => {
      const span = document.createElement('span');

      // <a class="link-settings account">Account</a>
      //  currentURL = http://localhost:4200/profile/projects/popular
      var check_currentURL = this.currentURL.split('/')[5] + "Project"
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
