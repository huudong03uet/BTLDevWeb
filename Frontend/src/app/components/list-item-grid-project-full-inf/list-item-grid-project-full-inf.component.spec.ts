import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemGridProjectFullInfComponent } from './list-item-grid-project-full-inf.component';

describe('ListItemGridProjectFullInfComponent', () => {
  let component: ListItemGridProjectFullInfComponent;
  let fixture: ComponentFixture<ListItemGridProjectFullInfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemGridProjectFullInfComponent]
    });
    fixture = TestBed.createComponent(ListItemGridProjectFullInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
