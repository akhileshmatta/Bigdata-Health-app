import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceDataComponent } from './insurance-data.component';

describe('InsuranceDataComponent', () => {
  let component: InsuranceDataComponent;
  let fixture: ComponentFixture<InsuranceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
