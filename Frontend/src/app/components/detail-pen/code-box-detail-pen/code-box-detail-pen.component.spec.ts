import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeBoxDetailPenComponent } from './code-box-detail-pen.component';

describe('CodeBoxDetailPenComponent', () => {
  let component: CodeBoxDetailPenComponent;
  let fixture: ComponentFixture<CodeBoxDetailPenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeBoxDetailPenComponent]
    });
    fixture = TestBed.createComponent(CodeBoxDetailPenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
