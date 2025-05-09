import { TestBed } from '@angular/core/testing';

import { StyleCachService } from './style-cach.service';

describe('StyleCachService', () => {
  let service: StyleCachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleCachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
