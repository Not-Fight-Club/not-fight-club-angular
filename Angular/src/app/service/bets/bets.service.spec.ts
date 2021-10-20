import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BetsService } from './bets.service';

describe('BetsService', () => {
  let service: BetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(BetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
