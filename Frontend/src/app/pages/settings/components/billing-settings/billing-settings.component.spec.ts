import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingSettingsComponent } from './billing-settings.component';

describe('BillingSettingsComponent', () => {
  let component: BillingSettingsComponent;
  let fixture: ComponentFixture<BillingSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingSettingsComponent]
    });
    fixture = TestBed.createComponent(BillingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
