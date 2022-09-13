import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsLoginComponent } from './diagnostics-login.component';

describe('DiagnosticsLoginComponent', () => {
  let component: DiagnosticsLoginComponent;
  let fixture: ComponentFixture<DiagnosticsLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticsLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
