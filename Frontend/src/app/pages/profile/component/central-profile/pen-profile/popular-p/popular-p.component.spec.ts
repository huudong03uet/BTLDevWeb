import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularPComponent } from './popular-p.component';

describe('PopularPComponent', () => {
  let component: PopularPComponent;
  let fixture: ComponentFixture<PopularPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularPComponent]
    });
    fixture = TestBed.createComponent(PopularPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
