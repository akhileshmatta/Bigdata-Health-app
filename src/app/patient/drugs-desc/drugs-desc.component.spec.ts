import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsDescComponent } from './drugs-desc.component';

describe('DrugsDescComponent', () => {
  let component: DrugsDescComponent;
  let fixture: ComponentFixture<DrugsDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
