import { Component } from '@angular/core';

@Component({
  selector: 'app-popular-project',
  templateUrl: './popular-project.component.html',
  styleUrls: ['./popular-project.component.scss']
})
export class PopularProjectComponent {
  project_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4]
}
