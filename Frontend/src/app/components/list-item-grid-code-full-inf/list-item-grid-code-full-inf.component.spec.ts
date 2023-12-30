import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemGridCodeFullInfComponent } from './list-item-grid-code-full-inf.component';

describe('ListItemGridCodeFullInfComponent', () => {
  let component: ListItemGridCodeFullInfComponent;
  let fixture: ComponentFixture<ListItemGridCodeFullInfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemGridCodeFullInfComponent]
    });
    fixture = TestBed.createComponent(ListItemGridCodeFullInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
