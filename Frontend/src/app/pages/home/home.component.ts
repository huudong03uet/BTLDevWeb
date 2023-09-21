import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  // closeResult: string;
  userData: any;


  constructor(
    private offcanvasService: NgbOffcanvas,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userData = params;
      console.log(this.userData);
    });
  }

  openStaticBackdrop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { backdrop: 'static' });
	}

  onNavbarButtonClick() {
    this.router.navigate(['/pen']).then(() => {
      // Sau khi chuyển hướng thành công, đóng offcanvas
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
