import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalManagementDataComponent } from './hospital-management-data.component';

describe('HospitalManagementDataComponent', () => {
  let component: HospitalManagementDataComponent;
  let fixture: ComponentFixture<HospitalManagementDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalManagementDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalManagementDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
