import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPComponent } from './public-p.component';

describe('PublicPComponent', () => {
  let component: PublicPComponent;
  let fixture: ComponentFixture<PublicPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicPComponent]
    });
    fixture = TestBed.createComponent(PublicPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
