import { Component } from '@angular/core';

@Component({
  selector: 'app-your-work-pens',
  templateUrl: './your-work-pens.component.html',
  styleUrls: ['./your-work-pens.component.scss']
})
export class YourWorkPensComponent {
  pen_ids = [
    1, 2, 3, 
    3, 2, 1,
    1, 2, 3,
    1, 2, 1,
    1, 2
  ]

  page_now: number = 1;
  pen_ids_current: any[] = [];
  is_end: boolean = false;
  is_start: boolean = true;


  check_is_start_end() {
    if (this.page_now == 1) {
      this.is_start = true;
    } else {
      this.is_start = false;
    }

    if (this.page_now * 6 >= this.pen_ids.length) {
      this.is_end = true;
    } else {
      this.is_end = false;
    }
  }
  
  constructor() { }
  ngOnInit(): void {
    this.pen_ids_current = this.pen_ids.slice(0, 6);
    this.check_is_start_end();
  }


  clickNextPageButton() {
    this.page_now += 1;
    this.pen_ids_current = this.pen_ids.slice((this.page_now - 1) * 6, this.page_now * 6);
    this.check_is_start_end();
  }

  clickPrevPageButton() {
    this.page_now -= 1;
    this.pen_ids_current = this.pen_ids.slice((this.page_now - 1) * 6, this.page_now * 6);
    this.check_is_start_end();
  }
}
