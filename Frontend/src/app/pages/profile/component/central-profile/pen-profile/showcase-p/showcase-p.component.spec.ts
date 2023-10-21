import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcasePComponent } from './showcase-p.component';

describe('ShowcasePComponent', () => {
  let component: ShowcasePComponent;
  let fixture: ComponentFixture<ShowcasePComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowcasePComponent]
    });
    fixture = TestBed.createComponent(ShowcasePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
