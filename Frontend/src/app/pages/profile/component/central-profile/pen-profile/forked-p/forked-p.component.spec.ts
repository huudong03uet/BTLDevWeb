import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkedPComponent } from './forked-p.component';

describe('ForkedPComponent', () => {
  let component: ForkedPComponent;
  let fixture: ComponentFixture<ForkedPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForkedPComponent]
    });
    fixture = TestBed.createComponent(ForkedPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
