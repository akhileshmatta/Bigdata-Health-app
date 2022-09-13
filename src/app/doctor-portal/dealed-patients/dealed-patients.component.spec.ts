import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealedPatientsComponent } from './dealed-patients.component';

describe('DealedPatientsComponent', () => {
  let component: DealedPatientsComponent;
  let fixture: ComponentFixture<DealedPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealedPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealedPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
