import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicationDataComponent } from './patient-medication-data.component';

describe('PatientMedicationDataComponent', () => {
  let component: PatientMedicationDataComponent;
  let fixture: ComponentFixture<PatientMedicationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMedicationDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMedicationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
