import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemGridCollectionFullInfComponent } from './list-item-grid-collection-full-inf.component';

describe('ListItemGridCollectionFullInfComponent', () => {
  let component: ListItemGridCollectionFullInfComponent;
  let fixture: ComponentFixture<ListItemGridCollectionFullInfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemGridCollectionFullInfComponent]
    });
    fixture = TestBed.createComponent(ListItemGridCollectionFullInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
