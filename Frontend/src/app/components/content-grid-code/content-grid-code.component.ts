import { Component, Input, OnInit } from '@angular/core';
import { Grid } from 'src/app/models/grid';

@Component({
  selector: 'app-content-grid-code',
  templateUrl: './content-grid-code.component.html',
  styleUrls: ['./content-grid-code.component.scss']
})
export class ContentGridCodeComponent implements OnInit{
  @Input() pen_id: any;
  data: any;
  constructor (
  ){}
  ngOnInit(): void {
    // console.log(this.data);
  }
  

}
