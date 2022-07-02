import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabSupDetailsComponent } from './lab-tech-details.component';

describe('LabSupDetailsComponent', () => {
  let component: LabSupDetailsComponent;
  let fixture: ComponentFixture<LabSupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabSupDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabSupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
