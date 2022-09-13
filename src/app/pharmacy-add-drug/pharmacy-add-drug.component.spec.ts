import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyAddDrugComponent } from './pharmacy-add-drug.component';

describe('PharmacyAddDrugComponent', () => {
  let component: PharmacyAddDrugComponent;
  let fixture: ComponentFixture<PharmacyAddDrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyAddDrugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyAddDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
