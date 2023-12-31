import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FullOptionControlItemService } from 'src/app/services/full-option-control-item.service';

import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-list-item-grid-project',
  templateUrl: './list-item-grid-project.component.html',
  styleUrls: ['./list-item-grid-project.component.scss']
})
export class ListItemGridProjectComponent implements OnInit {
  // parent -> child: pen_ids

  // @Input() pen_ids: any;
  @Input() project_ids: any;


  pen_ids_prev: any[] = [];
  pen_ids_next: any[] = [];
  pen_ids_current: any[] = [];
  is_start: boolean = true;
  is_end: boolean = false;
  index_first_current: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['project_ids']) {
      console.log("changes['project_ids']", this.project_ids)
      this.pen_ids_current = [];
      this.pen_ids_next = [];


      for (let i = this.index_first_current; i < this.index_first_current + 4; i++) {
        if (i < this.project_ids.length) {
          this.pen_ids_current.push(this.project_ids[i]);
        }
      }

      for (let i = this.index_first_current + 4; i < this.index_first_current + 6; i++) {
        if (i < this.project_ids.length) {
          this.pen_ids_next.push(this.project_ids[i]);
        }
      }
      this.check_is_start_end();
    }
  }

  check_is_start_end() {
    if (this.pen_ids_prev.length == 0) {
      this.is_start = true;
    } else {
      this.is_start = false;
    }

    if (this.pen_ids_next.length == 0) {
      this.is_end = true;
    } else {
      this.is_end = false;
    }

    if (this.pen_ids_current.length > 2) {
      const temp = this.pen_ids_current[1];
      this.pen_ids_current[1] = this.pen_ids_current[2];
      this.pen_ids_current[2] = temp;
    }

  }


  ngOnInit(): void {
    //  len pen_ids_current <= 4
    //  len pen_ids_next <= 4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   


    this.pen_ids_current = [];
    this.pen_ids_next = [];
    for (let i = this.index_first_current; i < this.index_first_current + 4; i++) {
      if (i < this.project_ids.length) {
        this.pen_ids_current.push(this.project_ids[i]);
      }
    }

    for (let i = this.index_first_current + 4; i < this.index_first_current + 6; i++) {
      if (i < this.project_ids.length) {
        this.pen_ids_next.push(this.project_ids[i]);
      }
    }





    this.check_is_start_end();

  }

  onClickPrevGridCode() {
    this.index_first_current -= 4;

    this.pen_ids_prev = [];
    this.pen_ids_next = [];
    this.pen_ids_current = [];

    for (let i = this.index_first_current - 2; i < this.index_first_current; i++) {
      if (i >= 0) {
        this.pen_ids_prev.push(this.project_ids[i]);
      }
    }

    for (let i = this.index_first_current; i < this.index_first_current + 4; i++) {
      if (i < this.project_ids.length) {
        this.pen_ids_current.push(this.project_ids[i]);
      }
    }

    for (let i = this.index_first_current + 4; i < this.index_first_current + 6; i++) {
      if (i < this.project_ids.length) {
        this.pen_ids_next.push(this.project_ids[i]);
      }
    }

    this.check_is_start_end();

  }
  onClickNextGridCode() {
    this.index_first_current += 4;

    this.pen_ids_prev = [];
    this.pen_ids_next = [];
    this.pen_ids_current = [];

    for (let i = this.index_first_current - 2; i < this.index_first_current; i++) {
      if (i >= 0) {
        this.pen_ids_prev.push(this.project_ids[i]);
      }
    }

    for (let i = this.index_first_current; i < this.index_first_current + 4; i++) {
      if (i < this.project_ids.length) {
        this.pen_ids_current.push(this.project_ids[i]);
      }
    }

    for (let i = this.index_first_current + 4; i < this.index_first_current + 6; i++) {
      if (i < this.project_ids.length) {
        this.pen_ids_next.push(this.project_ids[i]);
      }
    }

    this.check_is_start_end();

  }
}
