import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysDetailsComponent } from './phys-details.component';

describe('PhysDetailsComponent', () => {
  let component: PhysDetailsComponent;
  let fixture: ComponentFixture<PhysDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
