import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceDataComponent } from './ambulance-data.component';

describe('AmbulanceDataComponent', () => {
  let component: AmbulanceDataComponent;
  let fixture: ComponentFixture<AmbulanceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbulanceDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbulanceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
