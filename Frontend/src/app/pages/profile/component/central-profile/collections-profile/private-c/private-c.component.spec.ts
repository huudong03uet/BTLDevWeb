import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCComponent } from './private-c.component';

describe('PrivateCComponent', () => {
  let component: PrivateCComponent;
  let fixture: ComponentFixture<PrivateCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateCComponent]
    });
    fixture = TestBed.createComponent(PrivateCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
