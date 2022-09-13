import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDataRetreivalComponent } from './patient-data-retreival.component';

describe('PatientDataRetreivalComponent', () => {
  let component: PatientDataRetreivalComponent;
  let fixture: ComponentFixture<PatientDataRetreivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDataRetreivalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDataRetreivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
