import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralProfileComponent } from './central-profile.component';

describe('CentralProfileComponent', () => {
  let component: CentralProfileComponent;
  let fixture: ComponentFixture<CentralProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentralProfileComponent]
    });
    fixture = TestBed.createComponent(CentralProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
