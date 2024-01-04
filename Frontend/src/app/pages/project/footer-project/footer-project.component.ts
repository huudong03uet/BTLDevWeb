import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-footer-project',
  templateUrl: './footer-project.component.html',
  styleUrls: ['./footer-project.component.scss']
})
export class FooterProjectComponent {
  @Input() data: any;
  @Output() dataChange = new EventEmitter();

}
