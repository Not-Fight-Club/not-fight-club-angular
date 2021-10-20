import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BucksService } from './bucks.service';

describe('BucksService', () => {
  let service: BucksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(BucksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
