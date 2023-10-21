import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCComponent } from './popular-c.component';

describe('PopularCComponent', () => {
  let component: PopularCComponent;
  let fixture: ComponentFixture<PopularCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularCComponent]
    });
    fixture = TestBed.createComponent(PopularCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
