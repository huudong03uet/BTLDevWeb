import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovedCComponent } from './loved-c.component';

describe('LovedCComponent', () => {
  let component: LovedCComponent;
  let fixture: ComponentFixture<LovedCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LovedCComponent]
    });
    fixture = TestBed.createComponent(LovedCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
