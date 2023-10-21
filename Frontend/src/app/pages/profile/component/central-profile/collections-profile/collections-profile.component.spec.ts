import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsProfileComponent } from './collections-profile.component';

describe('CollectionsProfileComponent', () => {
  let component: CollectionsProfileComponent;
  let fixture: ComponentFixture<CollectionsProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionsProfileComponent]
    });
    fixture = TestBed.createComponent(CollectionsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
