import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingCenterComponent } from './following-center.component';

describe('FollowingCenterComponent', () => {
  let component: FollowingCenterComponent;
  let fixture: ComponentFixture<FollowingCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowingCenterComponent]
    });
    fixture = TestBed.createComponent(FollowingCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
