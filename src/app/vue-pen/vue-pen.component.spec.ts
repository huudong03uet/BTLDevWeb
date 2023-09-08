import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuePenComponent } from './vue-pen.component';

describe('VuePenComponent', () => {
  let component: VuePenComponent;
  let fixture: ComponentFixture<VuePenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VuePenComponent]
    });
    fixture = TestBed.createComponent(VuePenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
