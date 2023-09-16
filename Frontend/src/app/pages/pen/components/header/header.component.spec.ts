import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenHeaderComponent } from './header.component';

describe('PenHeaderComponent', () => {
  let component: PenHeaderComponent;
  let fixture: ComponentFixture<PenHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PenHeaderComponent]
    });
    fixture = TestBed.createComponent(PenHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
