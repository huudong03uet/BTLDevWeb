import { Component } from '@angular/core';

@Component({
  selector: 'app-body-following-trending',
  templateUrl: './body-following-trending.component.html',
  styleUrls: ['./body-following-trending.component.scss']
})
export class BodyFollowingTrendingComponent {
  activeNavItem: string = 'Your Work';

  // get url now of browser
  urlNow = window.location.href;
  
}
