import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargeStatusComponent } from './discharge-status.component';

describe('DischargeStatusComponent', () => {
  let component: DischargeStatusComponent;
  let fixture: ComponentFixture<DischargeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DischargeStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
