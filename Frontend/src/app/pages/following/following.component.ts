import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss', '../settings/style-settings.scss']
})
export class FollowingComponent implements OnInit {
  data: any;

  constructor(
    ) {}

  ngOnInit(): void {
    
  }
}
