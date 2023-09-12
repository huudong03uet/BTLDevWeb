import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  // closeResult: string;

  constructor(
    private offcanvasService: NgbOffcanvas,
    private router: Router
  ) {}

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
    this.router.navigate(['/signup']);
  }

}
