import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCollectionComponent } from './create-new-collection.component';

describe('CreateNewCollectionComponent', () => {
  let component: CreateNewCollectionComponent;
  let fixture: ComponentFixture<CreateNewCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewCollectionComponent]
    });
    fixture = TestBed.createComponent(CreateNewCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
