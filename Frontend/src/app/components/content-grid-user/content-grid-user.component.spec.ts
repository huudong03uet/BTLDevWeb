import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentGridUserComponent } from './content-grid-user.component';

describe('ContentGridUserComponent', () => {
  let component: ContentGridUserComponent;
  let fixture: ComponentFixture<ContentGridUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentGridUserComponent]
    });
    fixture = TestBed.createComponent(ContentGridUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
