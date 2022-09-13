import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBasicDataComponent } from './patient-basic-data.component';

describe('PatientBasicDataComponent', () => {
  let component: PatientBasicDataComponent;
  let fixture: ComponentFixture<PatientBasicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientBasicDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientBasicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
