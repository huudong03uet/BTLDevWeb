import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePComponent } from './template-p.component';

describe('TemplatePComponent', () => {
  let component: TemplatePComponent;
  let fixture: ComponentFixture<TemplatePComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplatePComponent]
    });
    fixture = TestBed.createComponent(TemplatePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
