import { Component } from '@angular/core';

@Component({
  selector: 'app-popular-p',
  templateUrl: './popular-p.component.html',
  styleUrls: ['./popular-p.component.scss']
})
export class PopularPComponent {
  listItem = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 1, 2, 3]
}
