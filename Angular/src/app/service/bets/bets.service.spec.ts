import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { BetsService } from './bets.service';

describe('BetsService', () => {
  let service: BetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(BetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
