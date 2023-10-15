import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
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
