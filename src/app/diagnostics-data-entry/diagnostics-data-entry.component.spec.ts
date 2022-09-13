import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsDataEntryComponent } from './diagnostics-data-entry.component';

describe('DiagnosticsDataEntryComponent', () => {
  let component: DiagnosticsDataEntryComponent;
  let fixture: ComponentFixture<DiagnosticsDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticsDataEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticsDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
