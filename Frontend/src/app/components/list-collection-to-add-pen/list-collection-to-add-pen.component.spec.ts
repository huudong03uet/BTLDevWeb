import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCollectionToAddPenComponent } from './list-collection-to-add-pen.component';

describe('ListCollectionToAddPenComponent', () => {
  let component: ListCollectionToAddPenComponent;
  let fixture: ComponentFixture<ListCollectionToAddPenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCollectionToAddPenComponent]
    });
    fixture = TestBed.createComponent(ListCollectionToAddPenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
