import { TestBed } from '@angular/core/testing';

import { BucksService } from './bucks.service';

describe('BucksService', () => {
  let service: BucksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BucksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
