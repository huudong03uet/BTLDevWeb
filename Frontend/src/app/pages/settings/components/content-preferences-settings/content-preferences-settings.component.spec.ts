import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPreferencesSettingsComponent } from './content-preferences-settings.component';

describe('ContentPreferencesSettingsComponent', () => {
  let component: ContentPreferencesSettingsComponent;
  let fixture: ComponentFixture<ContentPreferencesSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentPreferencesSettingsComponent]
    });
    fixture = TestBed.createComponent(ContentPreferencesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
