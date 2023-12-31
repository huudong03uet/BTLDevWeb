import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { HostService } from 'src/app/host.service';
@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit{
  constructor(private myService: HostService,){}

  data: any;
  ngOnInit(): void {
    const apiUrl = this.myService.getApiHost() + `/pen/getTrending`;
    axios.get(apiUrl)
    .then((response) => {
      this.data = response.data
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }
}
