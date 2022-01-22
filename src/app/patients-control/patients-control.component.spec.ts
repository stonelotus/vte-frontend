import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsControlComponent } from './patients-control.component';

describe('PatientsControlComponent', () => {
  let component: PatientsControlComponent;
  let fixture: ComponentFixture<PatientsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
