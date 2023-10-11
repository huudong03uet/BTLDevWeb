import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPreferencesSettingsComponent } from './editor-preferences-settings.component';

describe('EditorPreferencesSettingsComponent', () => {
  let component: EditorPreferencesSettingsComponent;
  let fixture: ComponentFixture<EditorPreferencesSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorPreferencesSettingsComponent]
    });
    fixture = TestBed.createComponent(EditorPreferencesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
