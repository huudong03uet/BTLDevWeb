import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyFollowingTrendingComponent } from './body-following-trending.component';

describe('BodyHomeComponent', () => {
  let component: BodyFollowingTrendingComponent;
  let fixture: ComponentFixture<BodyFollowingTrendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyFollowingTrendingComponent]
    });
    fixture = TestBed.createComponent(BodyFollowingTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
