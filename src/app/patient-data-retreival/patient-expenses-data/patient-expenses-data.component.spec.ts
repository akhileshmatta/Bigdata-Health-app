import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientExpensesDataComponent } from './patient-expenses-data.component';

describe('PatientExpensesDataComponent', () => {
  let component: PatientExpensesDataComponent;
  let fixture: ComponentFixture<PatientExpensesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientExpensesDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientExpensesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
