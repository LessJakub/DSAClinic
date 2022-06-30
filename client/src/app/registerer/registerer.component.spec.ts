import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistererComponent } from './registerer.component';

describe('RegistererComponent', () => {
  let component: RegistererComponent;
  let fixture: ComponentFixture<RegistererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
