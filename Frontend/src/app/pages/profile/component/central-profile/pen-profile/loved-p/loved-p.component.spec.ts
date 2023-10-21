import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovedPComponent } from './loved-p.component';

describe('LovedPComponent', () => {
  let component: LovedPComponent;
  let fixture: ComponentFixture<LovedPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LovedPComponent]
    });
    fixture = TestBed.createComponent(LovedPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
