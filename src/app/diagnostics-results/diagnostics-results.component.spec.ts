import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsResultsComponent } from './diagnostics-results.component';

describe('DiagnosticsResultsComponent', () => {
  let component: DiagnosticsResultsComponent;
  let fixture: ComponentFixture<DiagnosticsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticsResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
