import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-body-following-trending',
  templateUrl: './body-following-trending.component.html',
  styleUrls: ['./body-following-trending.component.scss']
})
export class BodyFollowingTrendingComponent {
  @Output() gotoFollowingPr = new EventEmitter();

  activeNavItem: string = 'Your Work';
  displayYourWork = true;

  // get url now of browser
  urlNow = window.location.href;
  gotoFollowing() {
    if(this.activeNavItem !== "Following") {
      this.activeNavItem = "Following";
      this.gotoFollowingPr.emit(); 
    }
  }

  showYourWork() {
    this.displayYourWork = !this.displayYourWork;
  }
}
