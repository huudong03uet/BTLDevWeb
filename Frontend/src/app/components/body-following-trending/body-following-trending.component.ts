import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-body-following-trending',
  templateUrl: './body-following-trending.component.html',
  styleUrls: ['./body-following-trending.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BodyFollowingTrendingComponent {
  @Output() gotoFollowingPr = new EventEmitter();

  ngAfterViewChecked() {
    this.addClassActive();
  }


  addClassActive() {
    const links = document.querySelectorAll('.nav-item a');
    //  run this function in ngAfterViewChecked
    const currentURL = window.location.href.split('/')[3];
    if (currentURL == 'following') {
      links[0].classList.add('active');

    }
    if (currentURL == 'trending') {
      links[1].classList.add('active');

    }
    if (currentURL == 'your-work') {
      links[2].classList.add('active');

    }
  }

  goToFollowing() {
    // if (this.activeNavItem !== 'Following') {
    //   this.activeNavItem = 'Following';
      // link to /following
      window.location.href = '/following';
    // }
  }

  goToTrending() {
    // if (this.activeNavItem !== 'Trending') {
    //   this.activeNavItem = 'Trending';
      // link to /trending
      window.location.href = '/trending';
    // }
  }

  goToYourWork() {
    // if (this.activeNavItem !== 'Your Work') {
    //   this.activeNavItem = 'Your Work';
      // link to /home
      window.location.href = '/your-work/pens';
    // }
  }

  // showYourWork() {
  //   this.displayYourWork = !this.displayYourWork;
  // }
}
