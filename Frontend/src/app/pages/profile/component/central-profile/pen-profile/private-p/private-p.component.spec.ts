import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePComponent } from './private-p.component';

describe('PrivatePComponent', () => {
  let component: PrivatePComponent;
  let fixture: ComponentFixture<PrivatePComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivatePComponent]
    });
    fixture = TestBed.createComponent(PrivatePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
