import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientOverlayComponent } from './add-patient-overlay.component';

describe('AddPatientOverlayComponent', () => {
  let component: AddPatientOverlayComponent;
  let fixture: ComponentFixture<AddPatientOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatientOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
