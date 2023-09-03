import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCodeComponent } from './home-code.component';

describe('HomeCodeComponent', () => {
  let component: HomeCodeComponent;
  let fixture: ComponentFixture<HomeCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCodeComponent]
    });
    fixture = TestBed.createComponent(HomeCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
