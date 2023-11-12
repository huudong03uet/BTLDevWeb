import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit{
  data: any;
  ngOnInit(): void {
    const apiUrl = `http://localhost:3000/pen/getTrending`;
    axios.get(apiUrl)
    .then((response) => {
      this.data = response.data
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }
}
