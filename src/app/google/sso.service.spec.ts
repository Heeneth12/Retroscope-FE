import { TestBed } from '@angular/core/testing';

import { SsoService } from './sso.service';

describe('SsoService', () => {
  let service: SsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
