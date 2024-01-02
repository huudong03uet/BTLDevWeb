import { Component } from '@angular/core';

@Component({
  selector: 'app-private-project',
  templateUrl: './private-project.component.html',
  styleUrls: ['./private-project.component.scss']
})
export class PrivateProjectComponent {
  project_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4]
}
