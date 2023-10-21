import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedPComponent } from './tagged-p.component';

describe('TaggedPComponent', () => {
  let component: TaggedPComponent;
  let fixture: ComponentFixture<TaggedPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaggedPComponent]
    });
    fixture = TestBed.createComponent(TaggedPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
