import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  constructor(
    private route: ActivatedRoute
  ) {}

  userData: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userData = params;
      console.log(this.userData);
    });
  }

}
