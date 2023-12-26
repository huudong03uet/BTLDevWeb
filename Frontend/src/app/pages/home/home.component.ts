import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  constructor(
    private offcanvasService: NgbOffcanvas,
    private router: Router,
    private userData: UserDataService
  ) {}
  ngOnInit(): void {
    // console.log(this.userData.getUserData(), 1234135)
    if(this.userData.getUserData() !== null) {
      this.router.navigate(['/following']);
    }
  }

  openStaticBackdrop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { backdrop: 'static' });
	}

  onNavbarButtonClick() {
    this.router.navigate(['/pen']).then(() => {
      this.offcanvasService.dismiss('Cross click');
    });
  }

  onLoginButtonClick() {
    this.router.navigate(['/login']);
  }

  onSigninButtonClick() {
    this.router.navigate(['/signin']);
  }

  gotoFollowingPr() {
    this.router.navigate(['/following']);
  }
}
