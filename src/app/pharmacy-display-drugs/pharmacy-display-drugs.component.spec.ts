import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyDisplayDrugsComponent } from './pharmacy-display-drugs.component';

describe('PharmacyDisplayDrugsComponent', () => {
  let component: PharmacyDisplayDrugsComponent;
  let fixture: ComponentFixture<PharmacyDisplayDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyDisplayDrugsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyDisplayDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
