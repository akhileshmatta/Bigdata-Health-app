import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAmbulanceComponent } from './patient-ambulance.component';

describe('PatientAmbulanceComponent', () => {
  let component: PatientAmbulanceComponent;
  let fixture: ComponentFixture<PatientAmbulanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAmbulanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAmbulanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
