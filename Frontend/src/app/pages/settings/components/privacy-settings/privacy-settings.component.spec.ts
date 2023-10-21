import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacySettingsComponent } from './privacy-settings.component';

describe('PrivacySettingsComponent', () => {
  let component: PrivacySettingsComponent;
  let fixture: ComponentFixture<PrivacySettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacySettingsComponent]
    });
    fixture = TestBed.createComponent(PrivacySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
