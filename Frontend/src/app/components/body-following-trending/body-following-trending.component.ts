import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-body-following-trending',
  templateUrl: './body-following-trending.component.html',
  styleUrls: ['./body-following-trending.component.scss']
})
export class BodyFollowingTrendingComponent {
  @Output() gotoFollowingPr = new EventEmitter();

  
  // displayYourWork = true;

  // get url now of browser
  urlNow = window.location.href;
  // activeNavItem: string = 'Following';
  // gotoFollowing() {
  //   if(this.activeNavItem !== "Following") {
  //     this.activeNavItem = "Following";
  //     this.gotoFollowingPr.emit(); 
  //   }
  // }

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
      window.location.href = '/your-work';
    // }
  }

  // showYourWork() {
  //   this.displayYourWork = !this.displayYourWork;
  // }
}
