import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCComponent } from './public-c.component';

describe('PublicCComponent', () => {
  let component: PublicCComponent;
  let fixture: ComponentFixture<PublicCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicCComponent]
    });
    fixture = TestBed.createComponent(PublicCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
