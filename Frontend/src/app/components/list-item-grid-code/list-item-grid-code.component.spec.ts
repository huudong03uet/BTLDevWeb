import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemGridCodeComponent } from './list-item-grid-code.component';

describe('ListItemGridCodeComponent', () => {
  let component: ListItemGridCodeComponent;
  let fixture: ComponentFixture<ListItemGridCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemGridCodeComponent]
    });
    fixture = TestBed.createComponent(ListItemGridCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
