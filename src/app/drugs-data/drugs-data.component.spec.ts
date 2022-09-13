import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsDataComponent } from './drugs-data.component';

describe('DrugsDataComponent', () => {
  let component: DrugsDataComponent;
  let fixture: ComponentFixture<DrugsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
