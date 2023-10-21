import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenProfileComponent } from './pen-profile.component';

describe('PenProfileComponent', () => {
  let component: PenProfileComponent;
  let fixture: ComponentFixture<PenProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PenProfileComponent]
    });
    fixture = TestBed.createComponent(PenProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
