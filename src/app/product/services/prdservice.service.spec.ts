import { TestBed } from '@angular/core/testing';

import { PrdserviceService } from './prdservice.service';

describe('PrdserviceService', () => {
  let service: PrdserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrdserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
