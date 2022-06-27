import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysCreateComponent } from './phys-create.component';

describe('PhysCreateComponent', () => {
  let component: PhysCreateComponent;
  let fixture: ComponentFixture<PhysCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
