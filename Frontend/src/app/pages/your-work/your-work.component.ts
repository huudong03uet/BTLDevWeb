import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-your-work',
  templateUrl: './your-work.component.html',
  styleUrls: ['./your-work.component.scss']
})
export class YourWorkComponent implements OnInit, AfterViewChecked {
  data: any;

  constructor(
    private route: ActivatedRoute,
    private userData: UserDataService,
    private router: Router
  ) { }

  currentURL = "";


  addClassActive() {
    const links = document.querySelectorAll('.home-your-work-button');
    links.forEach(link => {
      var check_currentURL = this.currentURL.split('/')[4];
      if (link.classList.contains(check_currentURL + "-button")) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  ngAfterViewChecked() {
    if (this.currentURL != window.location.href) {
      this.currentURL = window.location.href;
      this.addClassActive();
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = this.userData.getUserData()?.user_id;
      if (userId) {
        const apiUrl = `http://localhost:3000/pen/getPenByUser/${userId}`;

        axios.get(apiUrl)
          .then((response) => {
            this.data = response.data;
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        console.error('User ID not available.');
      }
    });
  }


  linkToYourWorkPens() {
    this.router.navigate(['/your-work/pens']);
  }

  linkToYourWorkCollections() {
    this.router.navigate(['/your-work/collections']);
  }

  linkToYourWorkDeleted() {
    this.router.navigate(['/your-work/deleted']);
  }


}
