import { TestBed } from '@angular/core/testing';

import { ArtisteCachService } from './artiste-cach.service';

describe('ArtisteCachService', () => {
  let service: ArtisteCachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtisteCachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
