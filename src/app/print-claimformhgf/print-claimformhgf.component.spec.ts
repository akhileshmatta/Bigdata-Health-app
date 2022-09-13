import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintClaimformhgfComponent } from './print-claimformhgf.component';

describe('PrintClaimformhgfComponent', () => {
  let component: PrintClaimformhgfComponent;
  let fixture: ComponentFixture<PrintClaimformhgfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintClaimformhgfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintClaimformhgfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
