import { TestBed } from '@angular/core/testing';

import { LoggedinRoleGuard } from './loggedin-role.guard';

describe('LoggedinRoleGuard', () => {
  let guard: LoggedinRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedinRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
