import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemGridProjectComponent } from './list-item-grid-project.component';

describe('ListItemGridProjectComponent', () => {
  let component: ListItemGridProjectComponent;
  let fixture: ComponentFixture<ListItemGridProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemGridProjectComponent]
    });
    fixture = TestBed.createComponent(ListItemGridProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
