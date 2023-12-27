import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullOptionControlItemComponent } from './full-option-control-item.component';

describe('FullOptionControlItemComponent', () => {
  let component: FullOptionControlItemComponent;
  let fixture: ComponentFixture<FullOptionControlItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullOptionControlItemComponent]
    });
    fixture = TestBed.createComponent(FullOptionControlItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
